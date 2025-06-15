import React from "react";
import { IconSend2 } from "@tabler/icons-react";

const MessageInput = () => {
  return (
    <div className="w-full  flex items-center">
      <div
        className={`bg-[#20284E] w-[90%] h-full transition-all duration-300 p-2 rounded-md flex  justify-between gap-3`}
      >
        <input
          type="text"
          className="p-3 text-[#000000] w-full h-full overflow-hidden
resize-none focus:outline-none align-top placeholder:text-[#616983]
 rounded-2xl leading-tight"
          placeholder="Something on your mind?"
          // onFocus={() => setFocusState(true)}
          // onBlur={() => setFocusState(false)}
        ></input>
      </div>
      <button className="bg-[#B36ABE] w-12 h-12 rounded-full flex justify-center items-center">
        <IconSend2 color="white" stroke={2} />
      </button>{" "}
    </div>
  );
};

export default MessageInput;
