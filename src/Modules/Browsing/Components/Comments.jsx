import React, { useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentInfo from "./CommentInfo";
import { usePost } from "../context/PostContext";
const Comments = ({ comment }) => {
  const [likePost, setLikePost] = useState(false);
  const [moreComments, setMoreComments] = useState(false);
  const backendUrl = "http://localhost:5003";
  const { postid } = useParams();

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
    FetchParentComments,
    nestedComments,
  } = usePost();
  
  useEffect(() => {
    FetchParentComments(comment);
  }, [commentsData]);

  return (
    <div className="bg-[#20284E]   items-top w-full justify-between gap-3 rounded-md  p-3 pt-4 ">
      <>
        <>
          <CommentInfo
            comment={comment}
            nestedCommentsCount={nestedComments[comment._id]?.length}
          ></CommentInfo>
          {nestedComments[comment._id]?.length > 0 && (
            <div className="pl-7 flex flex-col gap-2 ">
              <button
                onClick={() => {
                  setMoreComments(!moreComments);
                }}
                className="text-[#e4eaff71] text-left text-[12px] p-2 cursor-pointer  capitalize "
              >
                {moreComments ? "Show less Replies" : "View Replies"}
              </button>
              {moreComments &&
                nestedComments[comment._id].map((comments, index) => {
                  console.log(comments);
                  return (
                    <CommentInfo
                      repliedComment
                      comment={comments}
                      key={index}
                    />
                  );
                })}
            </div>
          )}
        </>
      </>
    </div>
  );
};

export default Comments;
