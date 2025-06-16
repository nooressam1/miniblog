import React, { useEffect, useState } from "react";
import { getMockUsers } from "../../Shared/Utilities/MockData";
import { useParams } from "react-router-dom";
import ChatContacts from "../Components/ChatContacts";
import MessagesBox from "../Components/MessagesBox";
import { getMockMessages } from "../../Shared/Utilities/MockData";

const mockMessages = getMockMessages();

const mockUsers = getMockUsers();
const ChatPage = () => {
  const { userId } = useParams();
  const [userChat, setUserChat] = useState(null);

  useEffect(() => {
    const userdata = mockUsers.find((u) => u.userId === userId);
    setUserChat(userdata);
  }, [userId]);
  if (!userChat) return <p>Loading...</p>; // or null

  const userMessages = mockMessages.filter(
    (msg) =>
      msg.senderId === userChat.userId || msg.receiverId === userChat.userId
  );

  // 2. Group by conversation partner
  const conversations = {};
  userMessages.forEach((msg) => {
    const otherUserId =
      msg.senderId === userChat.userId ? msg.receiverId : msg.senderId;

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
    <div className="w-full h-full ">
      <div className="h-[80vh] overflow-hidden flex gap-6 justify-center items-center">
        <ChatContacts chatList={chatList} userData={userChat}></ChatContacts>
        <MessagesBox conversations={conversations} userData={userChat}></MessagesBox>
      </div>
    </div>
  );
};

export default ChatPage;
