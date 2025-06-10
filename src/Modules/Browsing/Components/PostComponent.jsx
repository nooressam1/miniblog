import React, { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";
const PostComponent = ({
  userName,
  captionText,
  profilePicture,
  postType,
  postPhoto,
  commentAction,
}) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);

  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center w-full ${
        postType === "Photo" ? "  h-fit md:h-[550px]" : " h-fit "
      } `}
    >
      {postType === "Photo" && <ImageCarousel></ImageCarousel>}

      <div
        className={`bg-[#20284E]   flex flex-col ${
          postType === "Photo"
            ? "rounded-b-md md:rounded-r-md h-full  md:rounded-l-none w-[450px] md:w-[35%] "
            : "rounded-md w-[100%] h-fit "
        }`}
      >
        <div
          className={`bg-[#7E96F6] items-center gap-2 p-3 ${
            postType === "Photo"
              ? " rounded-none md:rounded-tr-md"
              : "rounded-t-md"
          } flex`}
        >
          <div className="h-10 w-10">
            <img
              className="rounded-3xl cursor-pointer h-full w-full object-cover"
              src={profilePicture}
              alt="Pfp"
            />
          </div>
          <Link to="/profile/DavidKim">
            <h1 className="text-[#E4EAFF] cursor-pointer">{userName}</h1>
          </Link>
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
                  className="bg-[#B36ABE]  hover:bg-[#da85e7] rounded-xl p-1 flex w-fit h-full text-center justify-center items-center"
                >
                  <IconHeartFilled color="white" />
                </button>
              ) : (
                <button
                  onClick={() => setLikePost(!likePost)}
                  className="bg-[#B36ABE]  hover:bg-[#da85e7] rounded-xl p-1 flex w-fit h-full text-center justify-center items-center"
                >
                  <IconHeart stroke={2} color="white" />
                </button>
              )}

              {savePost ? (
                <button
                  onClick={() => setSavePost(!savePost)}
                  className="bg-[#B36ABE]  hover:bg-[#da85e7] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
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
                  className="bg-[#B36ABE]  hover:bg-[#da85e7] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
                >
                  <img
                    src={Unsaved}
                    alt="Unsaved"
                    className="cursor-pointer p-1 h-fit w-fit object-cover"
                  />
                </button>
              )}
              <button
                onClick={commentAction}
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
