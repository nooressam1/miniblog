import React, { useState } from "react";
import PfpExample from "../Images/PfpExample.jpg";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
const TextPost = () => {
  const [likePost, setLikePost] = useState(false);
  return (
    <div>
      <div className="bg-[#20284E]   rounded-md">
        <div className="bg-[#7E96F6] items-center gap-2  p-3 rounded-t-md flex">
          <div className="h-10 w-10">
            <img
              className="rounded-3xl h-full w-full object-cover"
              src={PfpExample}
              alt="Pfp"
            />
          </div>
          <h1 className="text-[#E4EAFF]">UserName</h1>
        </div>
        <div className="p-4">
          <h1 className="text-[#CFD9FC] ">
            And in that moment I swear we were infinite
          </h1>
          <div className="flex justify-end ">
              {likePost ? (
                <button className="bg-[#B36ABE] rounded-xl p-1 flex w-[10%] h-full text-center justify-center items-center">
                  <IconHeartFilled color="white" />
                </button>
              ) : (
                <button className="bg-[#B36ABE] rounded-xl p-1 flex w-[10%] h-full text-center justify-center items-center">
                  <IconHeart stroke={2} color="white" />
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPost;
