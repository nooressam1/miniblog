import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, replace, useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedToken, setToken] = useState(null);
  const backendUrl = "http://localhost:5003";
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getNewAccessToken = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/auth/refreshToken`,
          {},
          { withCredentials: true }
        );
        login(res.data.user, res.data.accessToken); // Your login logic here
      } catch (err) {
        console.log("Refresh failed", err);
        logout(); // Optional
      } finally {
        setLoading(false); // done loading at this point
      }
    };
    getNewAccessToken();
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
        navigate("/login", { replace: true });
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
      {loading ? <p>Loading...</p> : children}
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
