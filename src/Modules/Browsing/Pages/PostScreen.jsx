import React, { useEffect, useState } from "react";
import ReturnButton from "../../Shared/Components/ReturnButton";
import PostComponent from "../Components/PostComponent";
import ReplyingComment from "../Components/ReplyingComment";
import Comments from "../Components/Comments";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostScreen = () => {
  const [replyTo, setReplyTo] = useState(null); // null or it will be which post or commment
  const { postid } = useParams();
  const backendUrl = "http://localhost:5003";
  const [postData, setPostData] = useState(false);
  const handleReplyToPost = () => {
    setReplyTo({ type: "post" });
  };

  const handleReplyToComment = (commentId) => {
    setReplyTo({ type: "comment", id: commentId });
  };
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/post/getPostInfo/${postid}`
        );
        console.log(res);
        setPostData(res.data);
      } catch (err) {
        console.log("failed to get posts", err);
      }
    };
    fetchPostData();
  }, [postid]);
  return (
    <div className="w-full  pl-7 pr-7 items-center justify-center flex flex-col">
      <div
        className={` h-full flex flex-col gap-2 md:w-[800px]  justify-center ${
          postData.posttype === "ImagePost" ? " md:w-[800px]" : " w-[100%] "
        }`}
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
          {replyTo && (
            <ReplyingComment
              userName={replyTo.type === "post" ? "Post" : `${replyTo.id}`}
              captionText="hehehehe"
            ></ReplyingComment>
          )}
          <Comments
            userName="ooxx"
            commentAction={handleReplyToComment}
          ></Comments>
        </div>
      </div>
    </div>
  );
};

export default PostScreen;
