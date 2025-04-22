import React, { useState } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";

const FilterButton = () => {
  const [pickState, setPickState] = useState("Following");
  const [openFilter, setOpenFilter] = useState(false);

  const handleSelect = (option) => {
    setPickState(option);
    setOpenFilter(false);
  };

  return (
    <div className="w-1/6 h-auto relative">
      <button
        className="rounded-md w-[90%] gap-1 h-14 bg-[#A30BA8] flex justify-center items-center"
        onClick={() => setOpenFilter(!openFilter)}
      >
        <h1 className="text-white font-medium">{pickState}</h1>
        {openFilter ? (
          <IconChevronUp color="white" stroke={2} />
        ) : (
          <IconChevronDown color="white" stroke={2} />
        )}
      </button>

      {/* Animated Dropdown */}
      <div
        className={`absolute top-full mt-1 w-[90%] bg-[#A30BA8] rounded-md   shadow-md z-10  transition-all duration-300 ease-in-out ${
          openFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <button
          className="w-full py-2 rounded-md  px-4 text-white text-left hover:bg-[#8a078e]"
          onClick={() => handleSelect("Following")}
        >
          Following
        </button>
        <button
          className="w-full py-2 rounded-md  px-4 text-white text-left hover:bg-[#8a078e]"
          onClick={() => handleSelect("Newest")}
        >
          Newest
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
