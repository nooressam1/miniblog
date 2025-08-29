import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../../Auth/Context/authContext";
import { io } from "socket.io-client";

const NotifContext = createContext();

export function NotifProvider({ children }) {
  const { user, savedToken, backendUrl } = useAuth();
  const socketRef = useRef(null);
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    // Create connection only once
    socketRef.current = io(backendUrl, {
      withCredentials: true,
    });

    // Listen for connection success
    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected with id:", socketRef.current.id);
      socketRef.current.emit("register", user._id);
    });

    // Listen for notifications
    socketRef.current.on("notification", (data) => {
      console.log("📩 New notification:", data);
      fetchNotifications();
      console.log("checking notifcations", notification);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [backendUrl, user?._id]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  async function fetchNotifications() {
    if (user) {
      const res = await axios.get(
        `${backendUrl}/api/notification/getNotifications/${user._id}`
      );
      setNotifications(res.data);
    }
  }
  return (
    <NotifContext.Provider
      value={{ notification, setNotifications, fetchNotifications }}
    >
      {children}
    </NotifContext.Provider>
  );
}
export const useNotifications = () => useContext(NotifContext);
