import React from "react";
import ReturnButton from "../../Shared/Components/ReturnButton";
import PostComponent from "../Components/PostComponent";
import ReplyingComment from "../Components/ReplyingComment";

const PostScreen = () => {
  return (
    <div className="w-full h-screen pl-7 pr-7 ">
      <div className="flex justify-center">
        <ReturnButton></ReturnButton>
        <PostComponent captionText="hehehehe"></PostComponent>
      </div>
      <div className="flex justify-center mt-4">

      <ReplyingComment userName="heyyy" captionText="hehehehe"></ReplyingComment>
      </div>
    </div>
  );
};

export default PostScreen;
