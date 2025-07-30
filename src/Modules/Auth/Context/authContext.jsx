import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedToken, setToken] = useState(null);
  const backendUrl = "http://localhost:5003";
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/auth/refreshToken`,
          {},
          { withCredentials: true }
        );
        console.log("testingworking", res.data);
        login(res.data.user, res.data.accessToken); // Your login logic here
      } catch (err) {
        console.log("Refresh failed", err);
        logout(); // Optional
      }
    };
    getNewAccessToken();
    console.log("testing user to make sure logined in " + user);
    setLoading(false); // done loading at this point
  }, []);

  const logout = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:5003/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser(null);
        setToken(null);
        setAccessToken(null);

        setLoading(false);
      });
  };

  const login = async (user, newAccessToken) => {
    setAccessToken(newAccessToken);
    setUser(user);
    setToken(newAccessToken);
    console.log(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, savedToken, backendUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth needs to be used with a authprovider");
  }
  return context;
}
