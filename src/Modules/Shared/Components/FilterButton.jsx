import React, { useState } from "react";
import { IconChevronUp, IconChevronDown } from "@tabler/icons-react";
import { useSearchParams } from 'react-router-dom';

const FilterButton = ({currentFilter,onChange }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const ChangeFilter = (option) => {
       onChange(option);
    setOpenFilter(false);
  };

  return (
    <div className="w-1/6 h-auto relative">
      <button
        className="rounded-md w-[90%] gap-1 h-14 bg-[#A30BA8] flex justify-center items-center"
        onClick={() => setOpenFilter(!openFilter)}
      >
        <h1 className="text-white font-medium">{currentFilter}</h1>
        {openFilter ? (
          <IconChevronUp color="white" stroke={2} />
        ) : (
          <IconChevronDown color="white" stroke={2} />
        )}
      </button>

      <div
        className={`absolute top-full mt-1 w-[90%] bg-[#A30BA8] rounded-md   shadow-md z-10  transition-all duration-300 ease-in-out ${
          openFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <button
          className="w-full py-2 rounded-md  px-4 text-white text-left hover:bg-[#8a078e]"
          onClick={() => onChange ("Following")}
        >
          Following
        </button>
        <button
          className="w-full py-2 rounded-md  px-4 text-white text-left hover:bg-[#8a078e]"
          onClick={() => onChange ("Newest")}
        >
          Newest
        </button>
          <button
          className="w-full py-2 rounded-md  px-4 text-white text-left hover:bg-[#8a078e]"
          onClick={() => onChange ("Trending")}
        >
          Trending
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
