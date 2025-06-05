import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

const ReturnButton = () => {
  return (
    <button
      className="rounded-md w-[10%] md:w-10 h-12 bg-[#A30BA8] flex justify-center items-center"
      // onClick={() => setOpenFilter(!openFilter)}
    >

      <IconChevronLeft color="white" stroke={3} />
    </button>
  );
};

export default ReturnButton;
