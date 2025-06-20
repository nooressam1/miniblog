import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedToken, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    console.log("testing user to make sure logined in " + storedUser);
    setLoading(false); // done loading at this point
  }, []);
  const logout = () => {
    setLoading(true);
    axios.get("http://localhost:5003/api/auth/logout").then(() => {
      setUser(null);
      navigate("/login", { replace: true });
      setLoading(false);
    });
  };
  const login = async (user, newToken) => {
    console.log("adding log" + newToken);
    localStorage.setItem("token", newToken); // Just store it
    localStorage.setItem("user", JSON.stringify(user));
    setToken(newToken);
    setUser(user);
    console.log(user);

    navigate("/profile/" + user.username);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
