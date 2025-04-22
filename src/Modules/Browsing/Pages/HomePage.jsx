import React from "react";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";

const HomePage = () => {
  return (
    <div>
      <div className="flex justify-center items-start ">
      <QuickPost></QuickPost>
      <FilterButton></FilterButton>
      </div>
    </div>
  );
};

export default HomePage;
