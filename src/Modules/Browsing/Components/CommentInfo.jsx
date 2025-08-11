import React, { useState } from "react";
import { usePost } from "../context/PostContext";
import { IconHeart, IconHeartFilled, IconMessage2 } from "@tabler/icons-react";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import dotImage from "../Images/dot.png";
const CommentInfo = ({
  comment,
  repliedComment = false,
  nestedCommentsCount,
}) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [onMouse, setOnMouse] = useState(false);
  const [onMouseButton, setOnMouseButton] = useState(false);

  const { user, backendUrl } = useAuth();

  const {
    postID,
    openReplyTo,
    setOpenReplyTo,
    replyingParentCommentId,
    repliedtoName,
    postData,
    commentsData,
    FetchComments,
    fetchPostData,
    setPostID,
    handleReplyToPost,
    handleReplyToComment,
  } = usePost();

  useEffect(() => {
    if (comment.likes.includes(user?._id)) {
      setLikePost(true);
    }
  }, [comment, commentsData]);

  const updateLikesMutation = useMutation({
    mutationFn: async () => {
      try {
        console.log("mutationFn called");

        const res = await axios.patch(
          `${backendUrl}/api/comment/likeComments/${user._id}/like/${comment._id}`
        );
        console.log("PATCH response:", res);
        return res.data; // return for React Query
      } catch (err) {
        console.error("PATCH failed:", err);
        throw err; // trigger onError
      }
    },
    onSuccess: () => {
      console.log("testing new data", commentsData);
      console.log("testing stale data", comment);
      setLikePost((prev) => !prev);
      FetchComments(postID);
    },
    onError: (error) => {
      console.error("Failed to like post:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(
          `${backendUrl}/api/comment/deleteComment/${comment._id}`
        );
        console.log("deleted comment", res);
        return res.data; // return for React Qury
      } catch (err) {
        console.error("deleted failed:", err);
        throw err; // trigger onError
      }
    },
    onSuccess: () => {
      FetchComments(postID);
    },
    onError: (error) => {
      console.error("Failed to like post:", error);
    },
  });

  const handleLike = () => {
    updateLikesMutation.mutate();
  };
  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };
  return (
    <div
      className="flex"
      onMouseEnter={() => {
        setOnMouse(true);
      }}
      onMouseLeave={() => setOnMouse(false)}
    >
      <div className="h-10 w-10">
        <img
          className="rounded-3xl cursor-pointer h-full w-full object-cover"
          src={comment.userId.profilepicture}
          alt="Pfp"
        />
      </div>
      <div className=" w-full gap-2 items-center">
        <div className="flex items-center gap-5">
          <h1 className="text-[#ffffff] cursor-pointer font-bold capitalize ">
            {comment.userId?.username}
          </h1>
          <h5 className="text-[#e4eaff71] text-sm cursor-pointer  capitalize ">
            {comment.createdAt}
          </h5>
          {onMouse && (
            <div
              onMouseEnter={() => {
                setOnMouseButton(true);
              }}
              onMouseLeave={() => {
                setOnMouseButton(false);
              }}
            >
              <div className="h-5 w-5">
                <img
                  className="rounded-3xl cursor-pointer h-full w-full object-cover"
                  src={dotImage}
                  alt="Pfp"
                />
              </div>
              {onMouseButton && (
                <button
                  onClick={() => {
                    handleDelete();
                  }}
                  className="bg-[#7E96F6] absolute p-1.5 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
        <div className=" flex justify-between">
          <h1 className="text-[#CFD9FC] p-1 ">
            {repliedComment
              ? "@" +
                comment.parentCommentId.userId.username +
                " " +
                comment.text
              : comment.text}
          </h1>

          {/* Main content area with flex-grow */}
          <div className="flex flex-col justify-between h-full ">
            {/* Buttons stick to bottom */}
            <div>
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
                  {comment.likes.length}
                </button>

                <button
                  onClick={() =>
                    handleReplyToComment(comment._id, comment.userId.username)
                  }
                  className="rounded-xl gap-1 text-[#CFD9FC] flex w-9 h-8 text-center justify-center items-center"
                >
                  <IconMessage2 stroke={2} color="#CFD9FC" />{" "}
                  {nestedCommentsCount}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentInfo;
