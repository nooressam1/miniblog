import React, { useState } from "react";

const PostFilter = () => {
  const [filterChoice, setFilterChoice] = useState("All");

  return (
    <div className="w-[95%] flex flex-col gap-3">
      <div className="flex  space-x-3">
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "All"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterChoice("All")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            All
          </h1>
        </button>{" "}
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "Images"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterChoice("Images")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            Images
          </h1>
        </button>
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "Pages"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterChoice("Pages")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            Pages
          </h1>
        </button>
      </div>
      <div className="w-full bg-[#7E96F6] h-[0.5px]"></div>
    </div>
  );
};

export default PostFilter;
