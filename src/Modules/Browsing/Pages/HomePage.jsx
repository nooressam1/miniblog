import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import { useAuth } from "../../Auth/Context/authContext";

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };
const backendUrl = "http://localhost:5003";

const HomePage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPosts, setFilteredPosts] = useState([]);

  /** 1️⃣ one helper that actually fetches */
  const fetchPosts = useCallback(
    async (currentFilter) => {
      try {
        let url;
        switch (currentFilter) {
          case "Trending":
            url = `${backendUrl}/api/feed/getTrendingPosts`;
            break;
          case "Following":
            url = `${backendUrl}/api/feed/getFollowingPosts/${user._id}`;
            break;
          default: // "Explore"
            url = `${backendUrl}/api/feed/getExplorePosts/${user._id}`;
        }
        const { data } = await axios.get(url);
        setFilteredPosts(Array.isArray(data) ? data : []);   // guard against non-array
      } catch (err) {
        console.error("failed to get posts", err);
      }
    },
    [user?._id]
  );

  /** 2️⃣ run once on mount to ensure we always have a filter in the URL */
  useEffect(() => {
    if (!searchParams.get("filter")) {
      // adds ?filter=Explore to the URL without an extra history entry
      setSearchParams({ filter: "Explore" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  /** 3️⃣ whenever the filter *value* changes, fetch the correct feed */
  const filter = searchParams.get("filter") || "Explore";
  useEffect(() => {
    fetchPosts(filter);
  }, [filter, fetchPosts]);

  /** 4️⃣ render */
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
        {filteredPosts.map((post) => (
          <TextPost
            key={post._id}                    
            userName={post.user.username}
            captionText={post.description}
            profilePicture={post.user.profilepicture}
            postType={post.posttype}
            postPhoto={post.postimages}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default HomePage;
