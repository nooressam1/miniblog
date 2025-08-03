import React, { useEffect, useState } from "react";
import EditInfo from "../../Account/Components/EditInfo";
import { useAuth } from "../../Auth/Context/authContext";
import axios from "axios";
import { useAccount } from "../../Account/context/accountContext";

const ProfileButtons = ({
  userAuthenticated,
  setOpenEditInfo,
  setOpenFollowers,
  setSwitchOpenFollowers,
}) => {
  const [followingAccount, setFollowingAccount] = useState(false);
  const [followerCount, setFollowerCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);
  const { user, logout } = useAuth();
  const { fetchUser, userInfo } = useAccount();

  const backendUrl = "http://localhost:5003";

  useEffect(() => {
    setFollowerCount(userInfo?.followers?.length);
    setFollowingCount(userInfo?.following?.length);
    console.log(userInfo.followers);
    if (
      userInfo?.followers?.some((id) => id.toString() === user?._id.toString())
    ) {
      setFollowingAccount(true);
    }
  }, [userInfo, user]);

  const HandleUserfollowing = async () => {
    try {
      if (followingAccount) {
        const response = await axios.put(
          `${backendUrl}/api/account/unfollowUser/${userInfo.username}`, // the opened users account
          { unfollowerUsername: user.username } // current user
        );
        await fetchUser(userInfo.username);
        setFollowerCount(userInfo?.followers?.length || 0);
        setFollowingCount(userInfo?.following?.length);

        setFollowingAccount(!followingAccount);
        console.log(response.data.message);
      } else {
        const response = await axios.put(
          `${backendUrl}/api/account/followUser/${userInfo.username}`,
          { followerUsername: user.username }
        );
        await fetchUser(userInfo.username);
        setFollowerCount(userInfo?.followers?.length || 0);
        setFollowingCount(userInfo?.following?.length);

        setFollowingAccount(!followingAccount);
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="w-full h-fit flex flex-col gap-4 p-4">
        <div className="flex md:flex-row flex-col w-full md:items-center justify-between">
          <div className="text-white capitalize text-3xl font-medium">
            {userInfo.username}
          </div>
          <div className="flex md:justify-center gap-4 items-center">
            <h1
              className="text-white cursor-pointer text-md font-sm w-fit whitespace-nowrap"
              onClick={() => {
                setOpenFollowers((prev) => !prev);
                setSwitchOpenFollowers("Followers");
              }}
            >
              {followerCount} Followers
            </h1>
            <h1
              onClick={() => {
                setOpenFollowers((prev) => !prev);
                setSwitchOpenFollowers("Following");
              }}
              className="text-white text-md  cursor-pointer font-sm whitespace-nowrap"
            >
              {followingCount} Following
            </h1>
            {userAuthenticated ? (
              <>
                <button
                  className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                  onClick={() => setOpenEditInfo((prev) => !prev)}
                >
                  <h1 className="text-white font-medium text-sm md:text-base">
                    Edit profile
                  </h1>
                </button>
                <button
                  className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                  onClick={() => logout()}
                >
                  <h1 className="text-white font-medium text-sm md:text-base">
                    logout
                  </h1>
                </button>
              </>
            ) : (
              <>
                <button
                  className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                  onClick={() => ""}
                >
                  <h1 className="text-white font-medium text-sm md:text-base">
                    Chat
                  </h1>
                </button>
                <button
                  className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                  onClick={() => HandleUserfollowing()}
                >
                  <h1 className="text-white font-medium text-sm md:text-base">
                    {followingAccount ? "Unfollow" : "Follow"}
                  </h1>
                </button>
              </>
            )}
          </div>
        </div>
        <h1 className="text-white text-md font-sm whitespace-nowrap overflow-hidden">
          {userInfo.description}
        </h1>
      </div>
    </>
  );
};

export default ProfileButtons;
