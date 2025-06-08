import React, { useState } from "react";
import ReturnButton from "../../Shared/Components/ReturnButton";
import PostComponent from "../Components/PostComponent";
import ReplyingComment from "../Components/ReplyingComment";
import Comments from "../Components/Comments";

const PostScreen = () => {
  const [replyTo, setReplyTo] = useState(null); // null or it will be which post or commment

  const handleReplyToPost = () => {
    setReplyTo({ type: "post" });
  };

  const handleReplyToComment = (commentId) => {
    setReplyTo({ type: "comment", id: commentId });
  };
  return (
    <div className="w-full  pl-7 pr-7 items-center justify-center flex flex-col">
      <div className=" h-full flex flex-col gap-2 md:w-[800px]  justify-center">
        <ReturnButton></ReturnButton>

        <PostComponent
          postType="Text"
          commentAction={handleReplyToPost}
          captionText="hehehehe"
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
