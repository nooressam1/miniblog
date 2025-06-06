import React, { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
const PostComponent = ({
  userName,
  captionText,
  profilePicture,
  postType,
  postPhoto,
}) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);

  return (
    <div className="flex justify-center w-[75%] h-[80%]">
      <div className="h-full w-[55%]">
        <img
          src={testphoto}
          alt="postImage"
          className="rounded-tl-md rounded-bl-md h-full w-full object-cover"
        />
      </div>

      <div className="bg-[#20284E] w-[40%] rounded-tr-md rounded-br-md flex flex-col">
        <div
          className={`bg-[#7E96F6] items-center gap-2 p-3 ${
            postType === "Photo" ? "rounded-none" : "rounded-tr-md"
          } flex`}
        >
          <div className="h-10 w-10">
            <img
              className="rounded-3xl cursor-pointer h-full w-full object-cover"
              src={profilePicture}
              alt="Pfp"
            />
          </div>
          <h1 className="text-[#E4EAFF] cursor-pointer">{userName}</h1>
        </div>

        {/* Main content area with flex-grow */}
        <div className="flex flex-col justify-between h-full p-4">
          <h1 className="text-[#CFD9FC]">{captionText}</h1>

          {/* Buttons stick to bottom */}
          <div className="mt-auto pt-4">
            <div className="flex gap-2 justify-end">
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

              {savePost ? (
                <button
                  onClick={() => setSavePost(!savePost)}
                  className="bg-[#B36ABE] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
                >
                  <img
                    src={Saved}
                    className="cursor-pointer p-1 h-fit w-fit object-cover"
                    alt="Saved"
                  />
                </button>
              ) : (
                <button
                  onClick={() => setSavePost(!savePost)}
                  className="bg-[#B36ABE] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
                >
                  <img
                    src={Unsaved}
                    alt="Unsaved"
                    className="cursor-pointer p-1 h-fit w-fit object-cover"
                  />
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
    </div>
  );
};

export default PostComponent;
