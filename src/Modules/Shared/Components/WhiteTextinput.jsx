import React from "react";

const WhiteTextinput = ({placeholder}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <input type="text"  className=" w-2/3 p-2 bg-transparent placeholder-[#CFD9FC] rounded-md text-[#CFD9FC] border-white border" placeholder={placeholder}/>
    </div>
  );
};

export default WhiteTextinput;
