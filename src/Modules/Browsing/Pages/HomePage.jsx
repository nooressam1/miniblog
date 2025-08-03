import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import { useAuth } from "../../Auth/Context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };
const backendUrl = "http://localhost:5003";

const HomePage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filter = searchParams.get("filter") || "Explore";

  const FetchPosts = useCallback(async () => {
    let endpoint;
    switch (filter) {
      case "Trending":
        endpoint = `${backendUrl}/api/feed/getTrendingPosts/${user._id}`;
        break;
      case "Following":
        endpoint = `${backendUrl}/api/feed/getFollowingPosts/${user._id}`;
        break;
      default:
        endpoint = `${backendUrl}/api/feed/getExplorePosts/${user._id}`;
    }
    const { data } = await axios.get(endpoint);
    return Array.isArray(data) ? data : [];
  }, [filter, user?._id]);

  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchingFilteredPosts", filter, user?._id],
    queryFn: FetchPosts,
    enabled: !!user,
  });

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
            key={post._id}
            Postuser={post.user}
            postinfo={post}
            refetchPosts={refetch}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default HomePage;
