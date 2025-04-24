import React from "react";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import PfpExample from "../../Shared/Images/PfpExample.jpg"

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center  ">
      <div className="flex justify-center items-start ">
        <QuickPost></QuickPost>
        <FilterButton></FilterButton>
      </div>
      <div className="w-full grid grid-cols-3 gap-8 justify-center items-start p-8">
        <TextPost
          userName="Username"
          captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius ante nulla, vel luctus nunc tincidunt in"
          profilePicture={PfpExample}
        ></TextPost>
        <TextPost
          userName="Username"
          captionText="Lorem ipsum dolor sit amet,n"
          profilePicture={PfpExample}
        ></TextPost>
        <TextPost
          userName="Username"
          captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius ante nulla, vel luctus nunc tincidunt in"
          profilePicture={PfpExample}
        ></TextPost>
           <TextPost
          userName="Username"
          captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius ante nulla, vel luctus nunc tincidunt in"
          profilePicture={PfpExample}
        ></TextPost>
      </div>
    </div>
  );
};

export default HomePage;
