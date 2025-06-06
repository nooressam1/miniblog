import React, { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
const Comments = ({
  userName,
  captionText,
  profilePicture,
  postType,
  postPhoto,
}) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);
  return (
    <div className="bg-[#20284E] ml-8  items-center w-[71.5%] justify-between  rounded-md flex p-3 ">
      <div className="flex gap-2 items-center">
        <div className="h-10 w-10">
          <img
            className="rounded-3xl cursor-pointer h-full w-full object-cover"
            src={profilePicture}
            alt="Pfp"
          />
        </div>
        <h1 className="text-[#E4EAFF] cursor-pointer font-bold capitalize ">{userName}</h1>
              <h1 className="text-[#CFD9FC]">{captionText}</h1>

      </div>

      {/* Main content area with flex-grow */}
      <div className="flex flex-col justify-between h-full ">
        {/* Buttons stick to bottom */}
        <div className="mt-auto ">
          <div className="flex gap-2 justify-end">
            {likePost ? (
              <button
                onClick={() => setLikePost(!likePost)}
                className="bg-[#B36ABE] rounded-xl p-1 flex w-fit h-full text-center justify-center items-center"
              >
                <IconHeartFilled color="white" />
              </button>
            ) : (
              <button
                onClick={() => setLikePost(!likePost)}
                className="bg-[#B36ABE] rounded-xl p-1 flex w-fit h-full text-center justify-center items-center"
              >
                <IconHeart stroke={2} color="white" />
              </button>
            )}

            <button
              onClick={() => setSavePost(!savePost)}
              className="bg-[#B36ABE] hover:bg-[#da85e7] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
            >
              <IconMessage2 stroke={2} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
