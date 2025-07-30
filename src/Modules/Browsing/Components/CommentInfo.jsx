import React, { useState } from "react";
import { usePost } from "../context/PostContext";
import { IconHeart, IconHeartFilled, IconMessage2 } from "@tabler/icons-react";

const CommentInfo = ({comment, repliedComment = false}) => {
  const [likePost, setLikePost] = useState(false);
    const [savePost, setSavePost] = useState(false);
      const {
        postID,
        openReplyTo,
        setOpenReplyTo,
        replyingParentCommentId, repliedtoName,
        postData,
        commentsData,
        FetchComments,
        fetchPostData,
        setPostID,
        handleReplyToPost,
        handleReplyToComment,
      } = usePost();
  return (
    <div className="flex">
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
        </div>
        <div className=" flex justify-between">
          <h1 className="text-[#CFD9FC] p-1 ">
            {repliedComment ? "@" + comment.parentCommentId.userId.username + " " + comment.text : comment.text  }</h1>
 
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
                  onClick={() => handleReplyToComment(comment._id, comment.userId.username)} // ✅ Now it's only called on click
                  className="bg-[#B36ABE] hover:bg-[#da85e7] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
                >
                  <IconMessage2 stroke={2} color="white" />
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
