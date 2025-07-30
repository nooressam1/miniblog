import React, { useEffect, useState } from "react";
import ReturnButton from "../../Shared/Components/ReturnButton";
import PostComponent from "../Components/PostComponent";
import ReplyingComment from "../Components/ReplyingComment";
import Comments from "../Components/Comments";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import { usePost } from "../context/PostContext";

const PostScreen = () => {
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
    replyTo,
    setPostData,
    setCommentsData,
  } = usePost();

  useEffect(() => {
    if (!postid) {
      setPostID(null);
      setPostData(null);
      // if you have setCommentsData or similar, call it too
      setCommentsData([]);
      return;
    }

    setPostID(postid);
  }, [postid]);
  useEffect(() => {
    const loadData = async () => {
      fetchPostData(postid);
      FetchComments(postid);
    };

    loadData();
  }, [postid]);
  if (!postid || postid === "undefined") {
    return <div className="text-white">no posts found</div>
  }
  return (
    <div className="w-full  pl-7 pr-7 items-center justify-center flex flex-col">
      <div
        className={` h-full flex flex-col gap-2 md:w-[900px] justify-center 
        `}
      >
        <ReturnButton></ReturnButton>

        <PostComponent
          postType={postData.posttype}
          commentAction={handleReplyToPost}
          captionText={postData.description}
          userName={postData.user?.username}
          profilePicture={postData.user?.profilepicture}
          postPhoto={postData.postimages}
        ></PostComponent>
        <div className="flex flex-col w-full justify-center items-center mt-4 gap-4">
          {openReplyTo && (
            <ReplyingComment
              userName={replyTo.type === "post" ? "Post" : `${replyTo.id}`}
              CommenterName={postData.user?.username}
              buttonAction={() => setOpenReplyTo(false)}
              replyingParentCommentId={replyingParentCommentId}
              postid={postid}
              repliedtoName={repliedtoName}
              FetchComments={FetchComments}
            />
          )}
          {commentsData.map((comment) => (
            <Comments key={comment._id} comment={comment}></Comments>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
