import React, { useState } from "react";

const PostFilter = () => {
  const [filterChoice, setFilterChoice] = useState("All");

  return (
    <div className="flex w-[95%] space-x-3">
      <button
        className="rounded-md  md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
        onClick={() => setFilterChoice("All")}
      >
        <h1 className="text-white   font-medium text-sm md:text-base ">All</h1>
      </button>{" "}
      <button
        className="rounded-md  md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
        onClick={() => setFilterChoice("Images")}
      >
        <h1 className="text-white   font-medium text-sm md:text-base ">
          Images
        </h1>
      </button>{" "}
      <button
        className="rounded-md  md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
        onClick={() => setFilterChoice("Pages")}
      >
        <h1 className="text-white   font-medium text-sm md:text-base ">
          Pages
        </h1>
      </button>
    </div>
  );
};

export default PostFilter;
