import React from 'react'

const BlueButton = ({title}) => {
  return (
    <div className='w-full h-auto mt-5 flex justify-center items-center'>
        <button className='w-[65%] h-fit font-bold hover:bg-[#8ca1f6] text-xl text-white p-3 rounded-md bg-[#7E96F6]'>{title}</button>
    </div>
  )
}

export default BlueButton