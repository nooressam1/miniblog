import React from "react";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import NullPfp from "../../Shared/Images/PfpExample.jpg";

const MessagesBox = ({ image, Username }) => {
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
          {Username}
        </h1>
      </div>
      <div >
      <div className="flex-1 overflow-auto  w-full h-full bg-[#20284E] flex flex-col">
        {/* Scrollable content */}
        <div className="h-[80%] overflow-auto p-3">
          <MessageBubble
            messageType="sender"
            status="unread"
            image={NullPfp}
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

"
          ></MessageBubble>
          <MessageBubble
            messageType="seender"
            status="unread"
            image={NullPfp}
            message="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

"
          ></MessageBubble>
        </div>

        {/* Absolute input at bottom */}
        <MessageInput></MessageInput>
      </div>
      </div>
    </div>
  );
};

export default MessagesBox;
