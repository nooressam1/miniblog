import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = () => {
    setLoading(true);
    axios.get("http://localhost:5003/api/auth/logout").then(() => {
      setUser(null);
      navigate("/login", { replace: true });
      setLoading(false);
    });
  };
   const login = async user =>{
    setUser(user);
    console.log(user);
    navigate("/profile/" + user.username);
   }  
   return <AuthContext.Provider value={{user,login,logout,loading}}>{children}</AuthContext.Provider>
}

export function useAuth()
{
    const context = useContext(AuthContext);
    if(context === undefined)
    {
        throw new Error("useAuth needs to be used with a authprovider");
    }
    return context; 
}