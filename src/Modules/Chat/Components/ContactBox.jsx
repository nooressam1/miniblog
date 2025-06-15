import React, { useState } from "react";

const ContactBox = ({ image, name, message, date }) => {
  return (
    <div className="w-full h-fit flex justify-between gap-2 p-4">
      <div className="h-12 w-12">
        <img
          className="rounded-full cursor-pointer h-full w-full object-cover"
          src={image}
          alt={"pfp"}
        />
      </div>
      <div className="w-fit">
        <h1 className="text-[#e5e3e3] font-bold capitalize ">{name}</h1>{" "}
        <h1 className="text-[#ACACAC] whitespace-nowrap  overflow-ellipsis overflow-hidden">
          {message}
        </h1>
      </div>
      <div>
        <h1 className="text-[#ACACAC] whitespace-nowrap  overflow-ellipsis overflow-hidden">
          {date}
        </h1>
      </div>
    </div>
  );
};

export default ContactBox;
