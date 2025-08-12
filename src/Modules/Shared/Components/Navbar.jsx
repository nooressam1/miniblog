import React, { useEffect, useRef, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/Context/authContext";
import { io } from "socket.io-client";
import { IconBellFilled } from "@tabler/icons-react";
import NotificationsBox from "./NotificationsBox";

const Navbar = () => {
  const { user, backendUrl } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      // Create connection only once
      socketRef.current = io(backendUrl, {
        withCredentials: true,
      });

      // Listen for connection success
      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected with id:", socketRef.current.id);
        socketRef.current.emit("register", user?._id);
      });

      // Listen for notifications
      socketRef.current.on("notification", (data) => {
        console.log("📩 New notification:", data);
        setNotifications((prev) => [data, ...prev]);
      });

      // Optional: listen for connection errors
      socketRef.current.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="w-full h-24 pl-8 pr-5 p-2">
        <div className="flex w-full h-full justify-between items-center">
          <Link to="/">
            <h1 className="text-[#CFD9FC] font-bold text-2xl">Z E L O</h1>
          </Link>
          <div className="grid h-full  grid-cols-[50px_1fr] justify-center items-center">
            <div className="h-2/5 w-2/3">
              <button className="bg-[#B36ABE] rounded-md  flex w-full h-full text-center justify-center items-center">
                <IconSearch color="white" stroke={2} />
              </button>
            </div>
            <Link to="/login" replace>
              <button className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center">
                <h1 className="text-white font-medium text-sm md:text-base">
                  Login
                </h1>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-24 pl-8 pr-5 p-2">
      <div className="flex w-full h-full justify-between items-center">
        <Link to="/">
          <h1 className="text-[#CFD9FC] font-bold text-3xl">Z E L O</h1>
        </Link>
        <div className=" h-full flex  gap-4 justify-center items-center">
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={()=>{setOpenNotif(!openNotif)}}  className="bg-[#B36ABE] rounded-md p-1.5 flex w-fit h-fit text-center justify-center items-center">
                <IconBellFilled stroke={2} color="white" />
              </button>
              {openNotif && (
                <div className="bg-[#20284E]  right-0 text-[#e4e4e4] z-20 mt-4 rounded-md w-96 h-fit absolute ">
                  <h1 className="px-3 pt-2 pb-2">Notifications</h1>
                  <div className="bg-[#171C36] w-full py-1 max-h-80 overflow-y-auto ">
                    {/* {notifications.length === 0 && (
                    <h1 className="text-gray-500 p-3 w-full text-center  text-sm font-sm">
                      No notifications
                    </h1>
                  )} */}
                    <NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3h ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox>
                    <NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox><NotificationsBox
                      notificationInfomessage={
                        "username commented on your posst!"
                      }
                      notificationInfodate={"3 hours ago"}
                      notificationInfo={`http://localhost:5003${user.profilepicture}`}
                    ></NotificationsBox>
                  </div>
                </div>
              )}
            </div>
            <button className="bg-[#B36ABE] rounded-md p-1.5 flex w-fit h-fit text-center justify-center items-center">
              <IconSearch color="white" stroke={2} />
            </button>
          </div>
          <Link to={`/profile/${user.username}`}>
            <div className="flex gap-2 w-full h-full justify-between items-center">
              <div className="flex  justify-center items-center h-10 w-10">
                <img
                  className="rounded-3xl cursor-pointer h-full w-full object-cover"
                  src={`http://localhost:5003${user.profilepicture}`}
                  alt="Pfp"
                />
              </div>

              <h1 className="text-[#CFD9FC] capitalize font-thin text-xl">
                {user.username}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
