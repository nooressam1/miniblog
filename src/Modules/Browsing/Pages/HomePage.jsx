import React, { useEffect, useState } from "react";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import Masonry from "react-masonry-css";
import { getMockPosts } from "../../Shared/Utilities/MockData";
import { useSearchParams } from "react-router-dom";

const mockposts = getMockPosts();
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!filter) {
      setSearchParams({ filter: "Newest" });// this changes the actual url
    }
  }, [filter, setSearchParams]);

  useEffect(() => {
    let filteredPosts = [...mockposts];

    if (filter === "Newest") {
      filteredPosts = filteredPosts.filter((post) => post.postType === "Photo");
    } else if (filter === "Trending") {
      filteredPosts = filteredPosts.sort((a, b) => b.likes - a.likes); 
    } else if (filter === "Following") {
      filteredPosts = filteredPosts.filter((post) => post.isFromFollowing); 
    }

    setPosts(filteredPosts);
  }, [filter]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center items-start">
        <QuickPost />
        <FilterButton
          currentFilter={filter}
          onChange={(newFilter) => {
            const params = new URLSearchParams(searchParams);
            params.set("filter", newFilter);
            setSearchParams(params);
          }}
        />
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
      </Masonry>
    </div>
  );
};

export default HomePage;
