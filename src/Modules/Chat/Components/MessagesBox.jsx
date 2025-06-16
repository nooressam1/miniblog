import React from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import NullPfp from "../../Shared/Images/PfpExample.jpg";

const MessagesBox = ({ image, userData , conversations }) => {
  return (
    <div className="rounded-md h-full  flex flex-col relative w-[55vw] ">
      <div className="bg-[#7E96F6] w-full h-[60px] p-3 rounded-t-md gap-4 flex text-center items-center">
        <div className="h-10 w-10">
          <img
            className="rounded-full cursor-pointer h-full w-full object-cover"
            src={image}
            alt={"pfp"}
          />
        </div>
        <h1 className="text-white text-lg text-center font-semibold ">
          {userData.userName}
        </h1>
      </div>
      <div>
        <div className="flex-1 overflow-auto  w-full h-full bg-[#20284E] flex flex-col">
          {/* Scrollable content */}
          <div className="h-[80%] overflow-auto p-3">
            {conversations.map((msg) => (
              <MessageBubble
                messageType={userData.userId === conversations.senderId ? "sender" : "receiver"}
                image={NullPfp}
                message={msg.text}


              ></MessageBubble>
            ))}
          </div>

          {/* Absolute input at bottom */}
          <MessageInput></MessageInput>
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
