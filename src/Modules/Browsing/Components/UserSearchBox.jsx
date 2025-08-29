import React from "react";
import { Link } from "react-router-dom";

const UserSearchBox = ({ User }) => {
  return (
    <div className="flex  mb-2 bg-primarylighter p-3 rounded-md justify-between  items-center">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10">
          <img
            className="rounded-3xl cursor-pointer h-full w-full object-cover"
            src={
              User.profilepicture.startsWith("http")
                ? User.profilepicture
                : `http://localhost:5003${User.profilepicture}`
            }
            alt="Pfp"
          />
        </div>
        <Link to={`/profile/${User.username}`}>
          <h1 className="text-[#E4EAFF] capitalize cursor-pointer">
            {User.username}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default UserSearchBox;
