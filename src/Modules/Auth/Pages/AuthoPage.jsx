import React, { useEffect } from "react";
import LoginComponent from "../Components/LoginComponent";
import BackgroundImage from "../Images/BackgroundImage.png";
import { useNavigate, useParams } from "react-router-dom";
import SignComponent from "../Components/SignComponent";
const AuthoPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!["login", "signup"].includes(page)) navigate("/signup");
  }, [page]);

  const handlePageChange = (newpage) => {
    console.log("auth page param:", page);
    navigate(`/${newpage}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {page === "login" ? (
          <LoginComponent ChangePage={() => handlePageChange("signup")} />
        ) : (
          <SignComponent ChangePage={() => handlePageChange("login")} />
        )}
      </div>
    </div>
  );
};

export default AuthoPage;
