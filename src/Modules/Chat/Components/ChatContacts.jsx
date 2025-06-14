import React from 'react'
import ContactBox from './ContactBox'

const ChatContacts = () => {
  return (
    <div className=' rounded-md h-full w-[30vw] overflow-hidden '>
        <div className='bg-[#7E96F6] w-full h-fit p-3 rounded-t-md'><h1 className='text-white text-lg text-center font-semibold '>Chat</h1></div>
        <div className='bg-[#20284E] h-full w-full overflow-auto'>
        <ContactBox  image={} name={} message={} date></ContactBox>
        </div>
    </div>
  )
}

export default ChatContacts