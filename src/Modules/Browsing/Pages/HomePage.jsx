import React from "react";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Masonry from "react-masonry-css";
import {getMockPosts} from "../../Shared/Utilities/MockData";

const posts = getMockPosts();
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center  ">
      <div className="flex justify-center items-start ">
        <QuickPost></QuickPost>
        <FilterButton></FilterButton>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-full gap-8 p-8"
        columnClassName="space-y-8"
      >
        {posts.map((post) => (
          <TextPost
            key={post.id}
            userName={post.userName}
            captionText={post.captionText}
            profilePicture={post.profilePicture}
            postType={post.postType}
            postPhoto={post.photoUrl}
          />
        ))}
        <TextPost
          userName="Username"
          captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius ante nulla, vel luctus nunc tincidunt in"
          profilePicture={PfpExample}
          postType="Photo"
        ></TextPost>
      </Masonry>
    </div>
  );
};

export default HomePage;
