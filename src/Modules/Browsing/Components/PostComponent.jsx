import React, { useEffect, useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
import ImageCarousel from "./ImageCarousel";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/Context/authContext";
import axios from "axios";
import { usePost } from "../context/PostContext";
import { useMutation } from "@tanstack/react-query";
const PostComponent = ({ commentAction }) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const {
    postID,
    openReplyTo,
    setOpenReplyTo,
    replyingParentCommentId,
    repliedtoName,
    postData,
    commentsData,
    FetchComments,
    fetchCommentCount,
    fetchPostData,
    commentCount,
  } = usePost();
  const { user, backendUrl } = useAuth();

  useEffect(() => {
    if (user && user.username === postData.user?.username) {
      setUserAuthenticated(true);
    }
    if (postData.likes?.includes(user?._id)) {
      setLikePost(true);
    }
  }, [user, postData.user?.username, postData.likes]);

  const updateLikesMutation = useMutation({
    mutationFn: () =>
      axios.patch(`${backendUrl}/api/post/updatelikes/${postData._id}`, {
        userId: user?._id,
      }),
    onSuccess: () => {
      setLikePost((prev) => !prev);
      fetchPostData(postID);
    },
    onError: (error) => {
      console.error("Failed to like post:", error);
    },
  });

  const handleLike = () => {
    updateLikesMutation.mutate();
  };
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center w-full ${
        postData.posttype === "ImagePost" ? "  h-fit md:h-[650px]" : " h-fit "
      } `}
    >
      {postData.posttype === "ImagePost" && (
        <ImageCarousel postPhoto={postData.postimages}></ImageCarousel>
      )}

      <div
        className={`bg-[#20284E] flex flex-col ${
          postData.posttype === "ImagePost"
            ? "rounded-b-md md:rounded-r-md h-full  md:rounded-l-none w-[85%] md:w-[75%] "
            : "rounded-md w-[100%] h-fit "
        }`}
      >
        <div
          className={`bg-[#7E96F6] items-center gap-2 p-3 ${
            postData.posttype === "ImagePost"
              ? " rounded-none md:rounded-tr-md"
              : "rounded-t-md"
          } flex`}
        >
          <div className="h-10 w-10">
            <img
              className="rounded-3xl cursor-pointer h-full w-full object-cover"
              src={`http://localhost:5003${postData.user?.profilepicture}`}
              alt="Pfp"
            />
          </div>
          <Link to={`/profile/${postData.user?.username}`}>
            <h1 className="text-[#E4EAFF] capitalize cursor-pointer">
              {postData.user?.username}
            </h1>
          </Link>
        </div>

        {/* Main content area with flex-grow */}
        <div className="flex flex-col justif[Violation] 'close' handler took 1948100msy-between h-full p-4">
          <h1 className="text-[#CFD9FC]">{postData.description}</h1>

          {/* Buttons stick to bottom */}
          <div className="mt-auto pt-4">
            <div className="flex gap-2 justify-end items-center">
              <button
                onClick={() => {
                  handleLike();
                }}
                className="gap-1 text-[#CFD9FC] rounded-xl  flex  h-full text-center justify-center items-center"
              >
                {likePost ? (
                  <IconHeartFilled color="#CFD9FC" />
                ) : (
                  <IconHeart stroke={2} color="#CFD9FC" />
                )}
                {postData.likes?.length}
              </button>

              <button
                onClick={commentAction}
                className="rounded-xl gap-1 text-[#CFD9FC] flex  h-8 text-center justify-center items-center"
              >
                <IconMessage2 stroke={2} color="#CFD9FC" /> {commentCount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
