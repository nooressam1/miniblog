import React, { useState } from "react";
import NullPfp from "../../Account/Images/nullpfp.jpg";

const ContactBox = ({ image, name, message, date }) => {
  return (
    <div className="w-full flex gap-4">
      <div>
        <img src={image} alt={"pfp"} />
      </div>
      <div >
        <h1>{name}</h1> <h1>{message}</h1>
      </div>
      <div><h1>{date}</h1></div>
    </div>
  );
};

export default ContactBox;
