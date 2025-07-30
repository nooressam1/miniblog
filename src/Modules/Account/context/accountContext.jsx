import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../../Auth/Context/authContext";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const { backendUrl } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const fetchUser = async (username) => {
    try {
      const response = await axios.get(`${backendUrl}/api/account/${username}`);
      setUserInfo(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return null;
    }
  };

  return (
    <AccountContext.Provider value={{ fetchUser ,userInfo}}>
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
