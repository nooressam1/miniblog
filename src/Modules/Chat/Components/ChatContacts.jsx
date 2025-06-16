import React, { useEffect, useState } from "react";
import ContactBox from "./ContactBox";
import NullPfp from "../../Account/Images/nullpfp.jpg";

const ChatContacts = ({ chatList }) => {

  // 1. Get all messages involving current user
  
  return (
    <div className=" rounded-md h-full w-[30vw] overflow-hidden ">
      <div className="bg-[#7E96F6] w-full h-fit p-3 rounded-t-md">
        <h1 className="text-white text-lg text-center font-semibold ">Chat</h1>
      </div>
      <div className="bg-[#20284E] h-full w-full overflow-auto flex flex-col items-center ">
        {chatList.map(({ partnerId, latestMessage }) => (
          <>
            <ContactBox
              // key={partnerId}
              name={partnerId} // map to username if you want
              message={latestMessage.text}
              date={latestMessage.timestamp}
              // add click handler etc.
            />
            <div className=" w-[95%] bg-[#323C6F] h-[1px]"></div>{" "}
          </>
        ))}
      </div>
    </div>
  );
};

export default ChatContacts;
