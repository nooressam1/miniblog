import React from "react";
import { IconSend2 } from "@tabler/icons-react";

const MessageInput = () => {
  return (
    <div className="w-full absolute bottom-0  h-[70px]  bg-[#20284E] flex items-center justify-center  gap-2">
      <div className="bg-white w-[90%] p-2 rounded-2xl flex items-center gap-2">
        <input
          type="text"
          className="text-black w-full bg-transparent focus:outline-none placeholder:text-[#616983]"
          placeholder="Something on your mind?"
        />
      </div>
      <button className="bg-[#B36ABE] w-12 h-12 rounded-full flex justify-center items-center">
        <IconSend2 color="white" stroke={2} />
      </button>
    </div>
  );
};

export default MessageInput;
