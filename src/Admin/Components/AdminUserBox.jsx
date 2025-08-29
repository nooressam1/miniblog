import { IconPencil } from "@tabler/icons-react";
import React, { useState } from "react";
import { useAuth } from "../../Modules/Auth/Context/authContext";
import axios from "axios";

const AdminUserBox = ({ User, handleDelete, banUser, changeRole }) => {
  const [onMouseButton, setOnMouseButton] = useState(false);
  const { backendUrl } = useAuth();

  return (
    <div className="grid grid-cols-5 p-4 text-white capitalize">
      <h1 className="w-full text-left">{User.username}</h1>
      <h1 className="w-full text-center">
        {User.createdAt ? User.createdAt : "none"}
      </h1>
      <h1 className="w-full text-center">{User.status}</h1>
      <h1 className="w-full text-center">{User.role}</h1>

      <div
        onMouseEnter={() => setOnMouseButton(true)}
        onMouseLeave={() => setOnMouseButton(false)}
        className="relative flex"
      >
        <div className="w-full flex justify-center">
          <IconPencil color="white" stroke={2} />
        </div>
        {onMouseButton && (
          <div className="absolute z-20 flex flex-col bg-secondary rounded-md ">
            <button
              onClick={() => handleDelete(User._id)}
              className="  p-1.5 px-4 text-white hover:bg-secondarylighter rounded-t-md text-sm"
            >
              Delete User
            </button>

            <button
              onClick={() => banUser(User._id)}
              className=" hover:bg-secondarylighter rounded-b-md  p-1.5 px-4 text-white  text-sm"
            >
              {User.status === "Banned" ? "Unban User" : "Ban User"}
            </button>
            <button
              onClick={() => changeRole(User._id)}
              className=" hover:bg-secondarylighter rounded-b-md  p-1.5 px-4 text-white  text-sm"
            >
              {User.role === "User" ? "Make Admin" : "Make User"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserBox;
