import React, { useEffect, useRef, useState } from "react";
import {
  IconBellRingingFilled,
  IconSearch,
  IconUserCog,
  IconUserCircle,
  IconBellFilled,
} from "@tabler/icons-react";
import {} from "@tabler/icons-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/Context/authContext";
import { io } from "socket.io-client";
import NotificationsBox from "./NotificationsBox";
import { useNotifications } from "../Context/notificationsContext";

import axios from "axios";
import { useNav } from "../Context/SearchContext";
const Navbar = () => {
  const { user, backendUrl } = useAuth();
  const { searchValue, setSearchValue, searchValueFunc, filterChoice } =
    useNav();

  const { notification, fetchNotifications } = useNotifications();
  const [unopenedNoti, setUnOpenedNotif] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [textinputFocus, setTextinputFocus] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {}, [searchValue, filterChoice]);

  useEffect(() => {
    if (notification.some((n) => n.read === false)) {
      setUnOpenedNotif(true);
    } else {
      setUnOpenedNotif(false);
    }
  }, [notification, unopenedNoti]);

  useEffect(() => {
    async function UpdateRead() {
      if (openNotif) {
        try {
          const res = await axios.patch(
            `${backendUrl}/api/notification/updateRead/${user._id}`
          );
          const updatedNotifications = notification.map((n) => ({
            ...n,
            read: true,
          }));

          fetchNotifications(); // optional: refresh from backend
          setUnOpenedNotif(false); // stop the animation
        } catch (err) {
          console.error("Failed to update notifications", err);
        }
      }
    }
    UpdateRead();
  }, [openNotif, notification]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setOpenNotif(false); // close the pop-up
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef]);

  return (
    <div className="w-full h-24 pl-8 pr-5 p-2">
      <div className="flex w-full h-full justify-between items-center">
        <Link to="/">
          <h1 className="text-[#CFD9FC] font-bold text-2xl md-text-3xl">
            Z E L O
          </h1>
        </Link>
        <div className=" h-full flex  gap-4 justify-center items-center">
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => {
                  setOpenNotif(!openNotif);
                }}
                className="bg-secondary rounded-md p-1.5 flex w-fit relative h-fit text-center justify-center items-center"
              >
                {unopenedNoti ? (
                  <>
                    <IconBellRingingFilled
                      stroke={2}
                      color="white"
                      className={" animate-rotate-shake"}
                    />
                  </>
                ) : (
                  <IconBellFilled stroke={2} color="white" />
                )}
              </button>
              {openNotif && (
                <div
                  ref={notifRef}
                  className="bg-[#20284E]  right-0 text-[#e4e4e4] z-20 mt-4 rounded-md w-96 h-fit absolute "
                >
                  <h1 className="px-3 pt-2 pb-2">Notifications</h1>
                  <div className="bg-[#171C36] w-full py-1 max-h-80 overflow-y-auto ">
                    {notification.length === 0 && (
                      <h1 className="text-gray-500 p-3 w-full text-center  text-sm font-sm">
                        No notifications
                      </h1>
                    )}
                    {notification.map((notif, index) => (
                      <NotificationsBox
                        key={index} // always add a key when mapping
                        notificationInfomessage={`${notif.message}`}
                        notificationInfodate={notif.createdAt} // you can replace this with actual time
                        notificationInfo={
                          notif.fromUser.profilepicture.startsWith("http")
                            ? notif.fromUser.profilepicture
                            : `http://localhost:5003${notif.fromUser.profilepicture}`
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="bg-secondary rounded-md p-1.5 flex w-fit text-center justify-center items-center"
              onClick={() => setTextinputFocus(!textinputFocus)}
            >
              <input
                type="text"
                placeholder="Search"
                className={`bg-transparent border-0 focus:outline-none placeholder-[#CFD9FC] text-[#CFD9FC] 
      transition-all duration-300 ease-in-out 
      ${
        textinputFocus ? "max-w-52 opacity-100 px-2" : "max-w-0 opacity-0 px-0 "
      }
      
    `}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  navigate(
                    `/search?query=${encodeURIComponent(e.target.value)}`
                  );
                }}
              />
              <IconSearch color="white" stroke={2} />
            </button>
            {user?.role === "Admin" && (
              <button
                className="bg-secondary rounded-md p-1.5 flex w-fit text-center justify-center items-center"
                onClick={() => navigate("/admin", { replace: true })}
              >
                <IconUserCog color="white" stroke={2} />
              </button>
            )}
          </div>
          <Link to={`/profile/${user?.username}`}>
            <div className="flex gap-2 w-full h-full justify-between items-center">
              <div className="flex  justify-center items-center h-10 w-10">
                <img
                  className="rounded-3xl cursor-pointer h-full w-full object-cover"
                  src={
                    user?.profilepicture.startsWith("http")
                      ? user?.profilepicture
                      : `http://localhost:5003${user?.profilepicture}`
                  }
                  alt="Pfp"
                />
              </div>
              <h1 className="text-[#CFD9FC] capitalize font-thin text-xl">
                {user?.username}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
