import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../Modules/Auth/Context/authContext";
import axios from "axios";
import { tuple } from "yup";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const { user, backendUrl } = useAuth();

  useEffect(() => {
    const CheckAuth = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/check`, {
          withCredentials: true,
        });
        if (res.data.authenticated && res.data.role === "Admin") {
          setAuthorized(true);
        }
      } catch (err) {
        setAuthorized(false);
      }
    };
    CheckAuth();
  }, []);

  if (!authorized) return <Navigate to="/login" replace></Navigate>;
  return children;
};

export default AdminRoute;
