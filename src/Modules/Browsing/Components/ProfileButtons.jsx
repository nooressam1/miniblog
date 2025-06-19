import React, { useEffect, useState } from "react";
import EditInfo from "../../Account/Components/EditInfo";

const ProfileButtons = ({ userInfo, userAuthenticated, setOpenEditInfo }) => {
  const [followingAccount, setFollowingAccount] = useState(false);
  const [followerCount, setFollowerCount] = useState(null);
  const [followingCount, setFollowingCount] = useState(null);

  useEffect(() => {
    setFollowerCount(userInfo.followers.length);
    setFollowingCount(userInfo.followers.length);
  });
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-4 p-4">
        <div className="flex md:flex-row flex-col w-full md:items-center justify-between">
          <div className="text-white capitalize text-3xl font-medium">
            {userInfo.username}
          </div>
          <div className="flex md:justify-center gap-4 items-center">
            <h1 className="text-white text-md font-sm w-fit whitespace-nowrap">
              {followerCount} Followers
            </h1>
            <h1 className="text-white text-md font-sm whitespace-nowrap">
              {followingCount} Following
            </h1>
            {userAuthenticated ? (
              <button
                className="rounded-md md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                onClick={() => setOpenEditInfo((prev) => !prev)}
              >
                <h1 className="text-white font-medium text-sm md:text-base">
                  Edit profile
                </h1>
              </button>
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
                  onClick={() => setFollowingAccount(!followingAccount)}
                >
                  <h1 className="text-white font-medium text-sm md:text-base">
                    {followingAccount ? "Follow" : "Unfollow"}
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
