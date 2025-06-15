import React, { useEffect, useState } from "react";
import ContactBox from "./ContactBox";
import NullPfp from "../../Account/Images/nullpfp.jpg";
import { getMockMessages } from "../../Shared/Utilities/MockData";

const mockMessages = getMockMessages();

const ChatContacts = ({ userData }) => {
  if (!userData) return <p>Loading...</p>; // or null

  // 1. Get all messages involving current user
  const userMessages = mockMessages.filter(
    (msg) =>
      msg.senderId === userData.userId || msg.receiverId === userData.userId
  );

  // 2. Group by conversation partner
  const conversations = {};
  userMessages.forEach((msg) => {
    const otherUserId =
      msg.senderId === userData.userId ? msg.receiverId : msg.senderId;

    if (!conversations[otherUserId]) conversations[otherUserId] = [];
    conversations[otherUserId].push(msg);
  });

  // 3. Sort each conversation messages descending by timestamp
  for (const partnerId in conversations) {
    conversations[partnerId].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }

  // 4. Map to an array of conversations with latest message
  const chatList = Object.entries(conversations).map(([partnerId, msgs]) => ({
    partnerId,
    latestMessage: msgs[0], // most recent message
  }));

  // 5. Sort chatList by latest message time descending
  chatList.sort(
    (a, b) =>
      new Date(b.latestMessage.timestamp) - new Date(a.latestMessage.timestamp)
  );
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
