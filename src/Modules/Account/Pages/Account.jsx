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

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const Account = ({ UserName }) => {
  const { user, backendUrl } = useAuth();
  const { fetchUser, userInfo } = useAccount();

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [switchOpenFollowers, setSwitchOpenFollowers] = useState("Followers");

  const [posts, setPosts] = useState([]);

  const [filterChoice, setFilterChoice] = useState("All");

  const { username } = useParams();
  const decodedUsername = decodeURIComponent(username); // decode %20 into space

  useEffect(() => {
    fetchUser(username);
    console.log("testing" + user);
  }, [decodedUsername]);

  useEffect(() => {
    if (userInfo && user && user.username === userInfo.username) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, [userInfo, user]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/post/getposts/${decodedUsername}`
        );

        let filteredPosts = res.data;
        if (filterChoice === "Images") {
          filteredPosts = filteredPosts.filter(
            (post) => post.posttype === "ImagePost"
          );
        } else if (filterChoice === "Pages") {
          filteredPosts = filteredPosts.filter(
            (post) => post.posttype === "textPost"
          );
        }

        setPosts(filteredPosts);
      } catch (errr) {
        console.log("failed to get posts", errr);
      }
    };
    fetchPosts();
  }, [filterChoice, decodedUsername]);

  if (!userInfo) return <div>User not found</div>;

  return (
    <div className="h-full w-full justify-center items-center  flex flex-col">
      <div className="w-full h-[40vh] md:h-[50vh]">
        <img
          className="w-full h-full object-cover"
          alt="Banner"
          src={`http://localhost:5003${userInfo.banner}`}
        />
      </div>

      <div className="w-full min-h-[23vh] max-h-[28vh] bg-[#20284E] flex items-center">
        <div className="w-full p-5 h-full flex flex-col md:flex-row">
          <div className="w-40 h-52 md:w-56 md:h-48 rounded-lg md:-mt-24 -mt-40">
            <img
              className="w-full h-full object-cover rounded-full  object-center"
              alt="pfp"
              src={`http://localhost:5003${userInfo.profilepicture}`}
            />
          </div>

          <ProfileButtons
            setOpenFollowers={setOpenFollowers}
            setOpenEditInfo={setOpenEditInfo}
            userAuthenticated={userAuthenticated}
            setSwitchOpenFollowers={setSwitchOpenFollowers}
          ></ProfileButtons>
        </div>
      </div>

      <div className="w-full flex flex-col mt-5  items-center">
        {userAuthenticated && <QuickPost />}
        <PostFilter setFilterOption={setFilterChoice} />
        {posts < 1 && (
          <h1 className="text-gray-600 ml-5 mt-4 text-md font-sm ">
            No Posts Available{" "}
          </h1>
        )}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full gap-8 p-8"
          columnClassName="space-y-8"
        >
          {posts.map((post) => (
            <TextPost
              key={post.id}
              user={post.user}
              postinfo={post}
              isOwner={userAuthenticated}
            />
          ))}
        </Masonry>
      </div>
      {openEditInfo && <EditInfo setOpenEditInfo={setOpenEditInfo}> </EditInfo>}
      {openFollowers && (
        <FollowerPopUp
          switchOpenFollowers={switchOpenFollowers}
          setOpenFollowers={setOpenFollowers}
        >
          {" "}
        </FollowerPopUp>
      )}
    </div>
  );
};

export default Account;
