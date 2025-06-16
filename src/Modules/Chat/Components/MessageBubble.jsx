import React from "react";
import { Link } from "react-router-dom";

const MessageBubble = ({ status, image, message, messageType }) => {
  const isSender = messageType === "sender";

  return (
    <div
      className={`w-full flex flex-col ${
        isSender ? "items-start" : "items-end"
      } `}
    >
      <div className={`w-fit p-2 flex gap-2   `}>
        {isSender && (
            <Link to={"/account" + "Username"}>
          <div className="h-10 w-10">
            <img
              className="rounded-full cursor-pointer h-full w-full object-cover"
              src={image}
              alt="pfp"
            />
          </div>
          </Link>
        )}
          <div className={` px-3 max-w-lg	 py-1 ${isSender ?  " bg-[#E4E4E4] rounded-lg rounded-tl-none" : " bg-[#A30BA8] rounded-lg rounded-tr-none" }`}>
            <h1 className={`${isSender ? "text-[#364242]" : "text-[#cecece]"}`}>{message}</h1>
          </div>
      </div>
    </div>
  );
};

export default MessageBubble;
