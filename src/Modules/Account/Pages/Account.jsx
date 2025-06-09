import React, { useState } from "react";
import BannerTest from "../Images/BannerTest.webp";
import QuickPost from "../../Shared/Components/QuickPost";
import PostFilter from "../Components/PostFilter";
const Account = () => {
  const [followingAccount, setFollowingAccount] = useState(false);
  return (
    <div className="h-screen w-full justify-center items-center flex flex-col">
      <div className="w-full h-[40vh] md:h-[50vh]">
        <img
          className="w-full h-full object-cover"
          alt="Banner"
          src={
            "https://i.pinimg.com/originals/c8/4f/b7/c84fb740471d58ba9597ace28969d490.gif"
          }
        />
      </div>{" "}
      {/*banners*/}
      <div className=" w-full min-h-[23vh] max-h-[28vh]  bg-[#20284E] flex  items-center ">
        <div className=" w-full p-5 h-full flex flex-col md:flex-row   ">
          <div className=" w-40 h-52 md:w-56 md:h-60 rounded-lg md:-mt-24 -mt-40 ">
            <img
              className="w-full h-full object-cover rounded-2xl object-center"
              alt="pfp"
              src={BannerTest}
            />
          </div>
          {/*profilepicture*/}

          <div className="w-full h-fit flex flex-col gap-4 p-4 ">
            <div className="flex md:flex-row flex-col  w-full md:items-center justify-between">
              <div className="text-white text-3xl font-medium">Username</div>
              <div className=" flex md:justify-center gap-4 items-center ">
                <h1 className="text-white text-md font-sm w-fit whitespace-nowrap   ">
                  0 Followers
                </h1>
                <h1 className="text-white text-md font-sm whitespace-nowrap">
                  0 Following
                </h1>
                <button
                  className="rounded-md  md:w-28 capitalize p-2 hover:bg-[#a92dad] bg-[#A30BA8] flex justify-center items-center"
                  onClick={() => setFollowingAccount(!followingAccount)}
                >
                  <h1 className="text-white   font-medium text-sm md:text-base ">
                    {followingAccount ? "Follow" : "unfollow"}
                  </h1>
                </button>
              </div>

              {/* following, followering and follow button*/}
            </div>
            <h1 className="text-white text-md font-sm whitespace-nowrap overflow-hidden">
              Description  DescriptionDescriptionDescriptionDescription Description
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col mt-3 gap-4 items-center ">
      <QuickPost></QuickPost>
      <PostFilter></PostFilter>
      </div>
    </div>
  );
};

export default Account;
