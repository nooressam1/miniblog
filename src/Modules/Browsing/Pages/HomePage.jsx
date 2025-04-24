import React from "react";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center items-start ">
        <QuickPost></QuickPost>
        <FilterButton></FilterButton>
      </div>
      <div className="w-[90%] grid grid-cols-3 gap-8">
        <TextPost></TextPost>
        <TextPost></TextPost>
        <TextPost></TextPost>

      </div>
    </div>
  );
};

export default HomePage;
