import React, { useEffect, useState } from "react";
import BannerTest from "../Images/BannerTest.webp";
import QuickPost from "../../Shared/Components/QuickPost";
import PostFilter from "../Components/PostFilter";
import { getMockPosts, getMockUsers } from "../../Shared/Utilities/MockData";
import Masonry from "react-masonry-css";
import TextPost from "../../Shared/Components/TextPost";
import { useParams } from "react-router-dom";
import EditInfo from "../Components/EditInfo";
import ProfileButtons from "../../Browsing/Components/ProfileButtons";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";

const mockposts = getMockPosts();

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const Account = ({ UserName }) => {
  const { user } = useAuth();

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const backendUrl = "http://localhost:5003";
  const [followingAccount, setFollowingAccount] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  const [filterChoice, setFilterChoice] = useState("All");

  const { username } = useParams();
  const decodedUsername = decodeURIComponent(username); // decode %20 into space

  useEffect(() => {
    console.log(user);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/account/${username}`
        );
        setUserInfo(response.data.user);
        console.log("hehehe ", response.data.user)
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [decodedUsername]);
  useEffect(() => {
    if (userInfo && user && user.username === userInfo.username) {
      setUserAuthenticated(true);
    }
  }, [userInfo, user]);
  useEffect(() => {
    let filteredPosts = [...mockposts];
    filteredPosts = filteredPosts.filter(
      (post) => post.userName === decodedUsername
    );

    if (filterChoice === "Images") {
      filteredPosts = filteredPosts.filter((post) => post.postType === "Photo");
    } else if (filterChoice === "Pages") {
      filteredPosts = filteredPosts.filter((post) => post.postType === "Text");
    }

    setPosts(filteredPosts);
  }, [filterChoice, decodedUsername]);

  if (!userInfo) return <div>User not found</div>;

  return (
    <div className="h-full w-full justify-center items-center flex flex-col">
      <div className="w-full h-[40vh] md:h-[50vh]">
        <img
          className="w-full h-full object-cover"
          alt="Banner"
          src={`https://alkuwaiti.com/wp-content/uploads/2020/05/Hero-Banner-Placeholder-Dark-1024x480.png`}
        />
      </div>

      <div className="w-full min-h-[23vh] max-h-[28vh] bg-[#20284E] flex items-center">
        <div className="w-full p-5 h-full flex flex-col md:flex-row">
          <div className="w-40 h-52 md:w-56 md:h-60 rounded-lg md:-mt-24 -mt-40">
            <img
              className="w-full h-full object-cover rounded-2xl object-center"
              alt="pfp"
              src={userInfo.profilepicture}
            />
          </div>

          <ProfileButtons
            setOpenEditInfo={setOpenEditInfo}
            userInfo={userInfo}
            userAuthenticated={userAuthenticated}
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
              userName={post.userName}
              captionText={post.captionText}
              profilePicture={post.profilePicture}
              postType={post.postType}
              postPhoto={post.photoUrl}
            />
          ))}
        </Masonry>
      </div>
      {openEditInfo && <EditInfo setOpenEditInfo={setOpenEditInfo}> </EditInfo>}
    </div>
  );
};

export default Account;
