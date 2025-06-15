import React, { useEffect, useState } from 'react'
import { getMockUsers } from "../../Shared/Utilities/MockData";
import { useParams } from "react-router-dom";
import ChatContacts from '../Components/ChatContacts';

const mockUsers = getMockUsers();
const ChatPage = () => {
    const { userId } = useParams();
    const [userChat, setUserChat] = useState(null);
    useEffect(() => {        
        const userdata = mockUsers.find((u) => u.userId === userId);
        setUserChat(userdata);
      }, [userId]);
  return (
    <div className="w-full h-full p-10">
      <div className='h-[70vh]'>
       <ChatContacts userId={userId} userData={userChat}></ChatContacts>
        </div>
      </div>
  )
}

export default ChatPage