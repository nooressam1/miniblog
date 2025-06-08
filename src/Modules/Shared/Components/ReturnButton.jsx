import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
 

const ReturnButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="rounded-md  w-10 h-11 bg-[#A30BA8] flex justify-center items-center"
     onClick={() => navigate(-1)}
    >

      <IconChevronLeft color="white" stroke={3} />
    </button>
  );
};

export default ReturnButton;
