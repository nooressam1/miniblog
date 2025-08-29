import React, { useEffect, useState } from "react";
import { useAccount } from "../context/accountContext";

const PostFilter = ({
  setFilterOption,
  filterChoice,
  options,
  shortwidth = false,
}) => {
  const { userAuthenticated } = useAccount();

  return (
    <div
      className={`${
        shortwidth ? "w-fit" : "w-full"
      } p-5 flex flex-col gap-3 mt-4`}
    >
      <div className="flex space-x-3">
        {options
          .filter((opt) => opt)
          .map((option, idx) => {
            if (option.requiresAuth && !userAuthenticated) return null;

            return (
              <button
                key={idx}
                className={`rounded-md md:w-28 capitalize p-2 flex justify-center items-center ${
                  filterChoice === option.label
                    ? "hover:bg-secondary bg-secondary"
                    : "bg-primarylighter"
                }`}
                onClick={() => setFilterOption(option.label)}
              >
                <h1 className="text-white font-medium text-sm md:text-base">
                  {option.label}
                </h1>
              </button>
            );
          })}
        {/* <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === option1
              ? " hover:bg-secondary bg-secondary"
              : "bg-primarylighter"
          }`}
          onClick={() => setFilterOption(option1)}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            {option1}
          </h1>
        </button>{" "}
        <button
          className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
            filterChoice === option2
              ? " hover:bg-secondary bg-secondary"
              : "bg-primarylighter"
          }`}
          onClick={() => setFilterOption(option2)}
        >
          <h1 className="text-white   font-medium text-sm md:text-base ">
            {option2}
          </h1>
        </button>
        {option3 && (
          <button
            className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
              filterChoice === option3
                ? " hover:bg-secondary bg-secondary"
                : "bg-primarylighter"
            }`}
            onClick={() => setFilterOption(option3)}
          >
            <h1 className="text-white   font-medium text-sm md:text-base ">
              {option3}
            </h1>
          </button>
        )}
        {userAuthenticated === true && (
          <button
            className={`rounded-md  md:w-28 capitalize  p-2  flex justify-center items-center ${
              filterChoice === option4
                ? " hover:bg-secondary bg-secondary"
                : "bg-primarylighter"
            }`}
            onClick={() => setFilterOption(option4)}
          >
            <h1 className="text-white   font-medium text-sm md:text-base ">
              {option4}
            </h1>
          </button>
        )} */}
      </div>
    </div>
  );
};

export default PostFilter;
