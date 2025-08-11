import React, { useEffect, useState } from "react";

const PostFilter = ({ setFilterOption, userAuthenticated, filterChoice }) => {
 
  return (
    <div className="w-[95%] flex flex-col gap-3 mt-4">
      <div className="flex  space-x-3">
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "All"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterOption("All")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            All
          </h1>
        </button>{" "}
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "ImagePost"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterOption("ImagePost")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            Images
          </h1>
        </button>
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === "textPost"
              ? " hover:bg-[#a92dad] bg-[#A30BA8]"
              : "bg-[#7E96F6]  "
          }`}
          onClick={() => setFilterOption("textPost")}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            Pages
          </h1>
        </button>
        {userAuthenticated === true && (
          <button
            className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
              filterChoice === "Liked"
                ? " hover:bg-[#a92dad] bg-[#A30BA8]"
                : "bg-[#7E96F6]  "
            }`}
            onClick={() => setFilterOption("Liked")}
          >
            <h1 className="text-white   font-medium text-sm md:text-base ">
              Liked
            </h1>
          </button>
        )}
      </div>
      <div className="w-full bg-[#373c50]  h-[0.5px]"></div>
    </div>
  );
};

export default PostFilter;
