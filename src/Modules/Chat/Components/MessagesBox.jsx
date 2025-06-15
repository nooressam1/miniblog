import React from "react";
import MessageInput from "./MessageInput";

const MessagesBox = ({ image }) => {
  return (
    <div className=" rounded-md h-full   w-[55vw] overflow-hidden ">
      <div className="bg-[#7E96F6] w-full h-fit p-3 rounded-t-md gap-4 flex text-center items-center">
        <div className="h-10 w-10">
          <img
            className="rounded-full cursor-pointer h-full w-full object-cover"
            src={image}
            alt={"pfp"}
          />
        </div>
        <h1 className="text-white text-lg text-center font-semibold ">Chat</h1>
      </div>
      <div className="bg-[#20284E]  h-full w-full overflow-auto flex flex-col items-center ">
        <div ></div>
        <MessageInput></MessageInput>
      </div>
    </div>
  );
};

export default MessagesBox;
