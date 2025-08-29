import React, { useEffect, useState } from "react";
import BannerTest from "../Images/BannerTest.webp";
import QuickPost from "../../Shared/Components/QuickPost";
import PostFilter from "../Components/PostFilter";
import Masonry from "react-masonry-css";
import TextPost from "../../Shared/Components/TextPost";
import { useParams } from "react-router-dom";
import EditInfo from "../Components/EditInfo";
import FollowerPopUp from "../Components/FollowerPopUp";

import ProfileButtons from "../../Browsing/Components/ProfileButtons";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import { useAccount } from "../context/accountContext";
import { useQuery } from "@tanstack/react-query";

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const Account = ({ UserName }) => {
  const { user, backendUrl } = useAuth();
  const { fetchUser, userInfo, userAuthenticated } = useAccount();

  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [switchOpenFollowers, setSwitchOpenFollowers] = useState("Followers");

  const [filterChoice, setFilterChoice] = useState("All");

  const { username } = useParams();
  const decodedUsername = decodeURIComponent(username); // decode %20 into space
  const fetchPosts = async ({ queryKey }) => {
    const [, usernameFromKey, filter] = queryKey;

    try {
      if (filterChoice !== "Liked") {
        const res = await axios.get(
          `${backendUrl}/api/post/getposts/${usernameFromKey}`,
          {
            params: { filter },
          }
        );
        console.log(res);

        return res.data || [];
      } else {
        const res = await axios.get(
          `${backendUrl}/api/account/fetchLikedPosts/${user._id}`
        );

        return res.data || [];
      }

      return [];
    } catch (errr) {
      console.log("failed to get posts", errr);
      return [];
    }
  };

  useEffect(() => {
    fetchUser(decodedUsername);
  }, [decodedUsername]);

  const {
    data: Posts = [],
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["accountPosts", decodedUsername, filterChoice],
    queryFn: fetchPosts,
    enabled: !!decodedUsername,
  });

  if (!userInfo) return <div>User not found</div>;

  return (
    <div className="h-full w-full justify-center items-center  flex flex-col">
      <div className="w-full h-[40vh] md:h-[50vh]">
        <img
          className="w-full h-full object-cover"
          alt="Banner"
          src={
            user.banner.startsWith("http")
              ? user.banner
              : `http://localhost:5003${user.banner}`
          }
        />
      </div>

      <div className="w-full min-h-[23vh] max-h-[28vh] bg-primarylighter flex items-center">
        <div className="w-full p-5 h-full flex flex-col md:flex-row">
          <div className="w-52 h-52 md:w-60 md:h-52 md:-mt-24 -mt-40 relative">
            <img
              className="w-full h-full object-cover rounded-full  object-center"
              alt="pfp"
              src={
                user.profilepicture.startsWith("http")
                  ? user.profilepicture
                  : `http://localhost:5003${user.profilepicture}`
              }
            />
          </div>

          <ProfileButtons
            setOpenFollowers={setOpenFollowers}
            setOpenEditInfo={setOpenEditInfo}
            setSwitchOpenFollowers={setSwitchOpenFollowers}
          ></ProfileButtons>
        </div>
      </div>

      <div className="w-full flex flex-col mt-5 md:p-0 p-3 items-center">
        {userAuthenticated && <QuickPost />}
        <PostFilter
          setFilterOption={setFilterChoice}
          filterChoice={filterChoice}
          options={[
            { label: "All" },
            { label: "Images" },
            { label: "textPost" },
            { label: "Liked", requiresAuth: true },
          ]}
        />
        {isPostsLoading && (
          <div className="text-gray-400 mt-4">Loading posts...</div>
        )}
        {postsError && (
          <div className="text-red-500 mt-4">Failed to load posts.</div>
        )}

        {!isPostsLoading && Posts.length < 1 && (
          <h1 className="text-gray-600  ml-5 mt-10 text-md font-sm">
            No Posts Available
          </h1>
        )}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full gap-8 p-2 px-5"
          columnClassName="space-y-8"
        >
          {Posts.map((post) => (
            <TextPost
              key={post.id}
              Postuser={post.user}
              postinfo={post}
              isOwner={
                filterChoice === "Liked"
                  ? !userAuthenticated
                  : userAuthenticated
              }
              refetchPosts={refetchPosts}
            />
          ))}
        </Masonry>
      </div>
      {openEditInfo && <EditInfo setOpenEditInfo={setOpenEditInfo}> </EditInfo>}
      {openFollowers && (
        <FollowerPopUp
          switchOpenFollowers={switchOpenFollowers}
          setOpenFollowers={setOpenFollowers}
          userInfo={userInfo}
        >
          {" "}
        </FollowerPopUp>
      )}
    </div>
  );
};

export default Account;
