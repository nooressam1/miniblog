import React, { useEffect, useState } from 'react'
import { getMockMessages, getMockPosts, getMockUsers } from "../../Shared/Utilities/MockData";
import { useParams } from "react-router-dom";
import ChatContacts from '../Components/ChatContacts';

const mockMessages = getMockMessages();
const mockUsers = getMockUsers();
const ChatPage = () => {
    const { userId } = useParams();
    const [userChat, setUserChat] = useState();
    useEffect(() => {        
        const userdata = mockUsers.find((u) => u.userId === userId);
        setUserChat(userdata);
      }, [userId]);
  return (
    <div className="w-full h-full p-10">
      <div className='h-[70vh]'>
       <ChatContacts></ChatContacts>
        </div>
      </div>
  )
}

export default ChatPage