import React, { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";

const TextPost = ({ userName, captionText, profilePicture, postType,postPhoto }) => {
  const [likePost, setLikePost] = useState(false);
  return (
    <div>
      <div className="bg-[#20284E]   rounded-md">
        {postType === "Photo" && (
          <div className="h-1/3 w-full ">
            <img
              src={postPhoto}
              alt="postImage"
              className="rounded-t-lg h-full w-full object-cover"
            />
          </div>
        )}
        <div className={`bg-[#7E96F6] items-center gap-2  p-3  ${ postType === "Photo" ? "rounded-none": "rounded-t-md" }  flex`}>
          <div className="h-10 w-10">
            <img
              className="rounded-3xl h-full w-full object-cover"
              src={profilePicture } // remove photopost and just add the image here and check if its a photo or text kind of post
              alt="Pfp"
            />
          </div>
          <h1 className="text-[#E4EAFF]">{userName}</h1>
        </div>
        <div className="p-4">
          <h1 className="text-[#CFD9FC] ">{captionText} </h1>
          <div className="flex justify-end ">
            {likePost ? (
              <button
                onClick={() => setLikePost(!likePost)}
                className="bg-[#B36ABE] rounded-xl p-1 flex w-[10%] h-full text-center justify-center items-center"
              >
                <IconHeartFilled color="white" />
              </button>
            ) : (
              <button
                onClick={() => setLikePost(!likePost)}
                className="bg-[#B36ABE] rounded-xl p-1 flex w-[10%] h-full text-center justify-center items-center"
              >
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
