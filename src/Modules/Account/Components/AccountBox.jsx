import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AccountBox = ({ User, operation }) => {
  return (
    <div className="flex w-[95%] justify-between  items-center">
      <div className="flex items-center">
        <div className="h-10 w-10">
          <img
            className="rounded-3xl cursor-pointer h-full w-full object-cover"
            src={`http://localhost:5003${User.profilepicture}
}`}
            alt="Pfp"
          />
        </div>
        <Link to={`/profile/${User.username}`}>
          <h1 className="text-[#E4EAFF] capitalize cursor-pointer">
            {User.username}
          </h1>
        </Link>
      </div>

      <button
        className="rounded-md   p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
        onClick={() => operation(User.username)}
      >
        <h1 className="text-white font-medium text-sm md:text-sm">
          Remove follower
        </h1>
      </button>
    </div>
  );
};

export default AccountBox;
