import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../Auth/Context/authContext";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const { backendUrl, user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const fetchUser = async (username) => {
    try {
      const response = await axios.get(`${backendUrl}/api/account/${username}`);
      setUserInfo(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };
  useEffect(() => {
    if (userInfo && user && user.username === userInfo.username) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, [userInfo, user]);
  

  return (
    <AccountContext.Provider value={{ fetchUser, userInfo, userAuthenticated }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
