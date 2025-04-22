import React, { useState } from "react";
import { IconPlus, IconSend2 } from "@tabler/icons-react";

const QuickPost = () => {
  const [focusState, setFocusState] = useState(false);

  return (
    <div
      className={`w-full ${
        focusState ? "h-40" : "h-14"
      } transition-all duration-300 flex justify-center items-start`}
    >
      <div
        className={`bg-[#20284E] w-[95%] h-full transition-all duration-300 p-2 rounded-md flex ${
          focusState ? "flex-col items-start" : "flex-row items-center"
        } justify-between gap-3`}
      >
        <textarea
          className="bg-transparent text-[#CFD9FC] w-full h-full overflow-hidden
resize-none focus:outline-none align-top placeholder:text-[#8A94B9]
p-2 rounded-md leading-tight"
          placeholder="Something on your mind?"
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
        />

        <div
          className={`flex gap-2 ${
            focusState ? "self-end mt-auto" : ""
          } transition-all duration-300`}
        >
          <button className="bg-[#B36ABE] p-2 rounded-md flex justify-center items-center">
            <IconPlus color="white" stroke={2} />
          </button>
          <button className="bg-[#B36ABE] p-2 rounded-md flex justify-center items-center">
            <IconSend2 color="white" stroke={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickPost;
