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

const mockposts = getMockPosts();
const mockUsers = getMockUsers();

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
};

const Account = ({ UserName }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(true);
  const [openEditInfo, setOpenEditInfo] = useState(false);

  const [followingAccount, setFollowingAccount] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  const [filterChoice, setFilterChoice] = useState("All");

  const { username } = useParams();
  const decodedUsername = decodeURIComponent(username); // decode %20 into space

  useEffect(() => {
    console.log("Decoded username from URL:", decodedUsername);
    console.log(
      "Available usernames in mockUsers:",
      mockUsers.map((u) => u.userName)
    );

    const userInfo = mockUsers.find((u) => u.userName === decodedUsername);
    setUserInfo(userInfo);
    console.log("Matched user info:", userInfo);
  }, [decodedUsername]);

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
          src="https://i.pinimg.com/originals/c8/4f/b7/c84fb740471d58ba9597ace28969d490.gif"
        />
      </div>

      <div className="w-full min-h-[23vh] max-h-[28vh] bg-[#20284E] flex items-center">
        <div className="w-full p-5 h-full flex flex-col md:flex-row">
          <div className="w-40 h-52 md:w-56 md:h-60 rounded-lg md:-mt-24 -mt-40">
            <img
              className="w-full h-full object-cover rounded-2xl object-center"
              alt="pfp"
              src={BannerTest}
            />
          </div>

          <ProfileButtons setOpenEditInfo={setOpenEditInfo}  userInfo={userInfo} userAuthenticated={userAuthenticated}></ProfileButtons>
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
