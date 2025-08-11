import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../../Auth/Context/authContext";
import { useParams } from "react-router-dom";

const PostContext = createContext();
export function PostProvider({ children }) {
  const [replyTo, setReplyTo] = useState("Post"); // null or it will be which post or commment
  const { user, savedToken, backendUrl } = useAuth();
  const [commentCount, setCommentCount] = useState(0);
  const [openReplyTo, setOpenReplyTo] = useState(false); // Open Respond Component
  const [postID, setpostID] = useState("");

  const [postData, setPostData] = useState(false); // Holds all the info about the post
  const [commentsData, setCommentsData] = useState([]); // Holds all the general comments
  const [nestedComments, setNestedComments] = useState([]);

  const [replyingParentCommentId, SetReplyingParentCommentId] =
    useState(postID); // holds the id of the replyingparentID
  const [repliedtoName, setRepliedtoName] = useState("");

  function setPostID(postid) {
    setpostID(postid);
  }
  const handleReplyToPost = () => {
    setReplyTo({ type: "post" });
    SetReplyingParentCommentId(null);
    setRepliedtoName(postData.user?.username);
    setOpenReplyTo(true);
  };
  const handleReplyToComment = (commentId, commenterName) => {
    setReplyTo({ type: "comment", id: commentId });
    setOpenReplyTo(true);

    SetReplyingParentCommentId(commentId);
    setRepliedtoName(commenterName);
  };
  
  const FetchComments = async (postid, allcomments) => {
    try {
      if (!postid) return;

      const res = await axios.get(
        `${backendUrl}/api/comment/fetchComments/${postid}`,
        { params: { getAll: allcomments } }
      );
      console.log("testingcomments")
      setCommentsData(res.data);
    } catch (err) {
      console.log("failed to get comments", err);
    }
  };

  const fetchCommentCount = async (postId) => {
    const res = await axios.get(
      `${backendUrl}/api/comment/fetchCommentCount/${postId}`
    );
    setCommentCount(res.data);
  };
  const fetchPostData = async (postid) => {
    try {
      if (!postid) return;
      console.log(`working ${backendUrl}/api/post/getPostInfo/${postid}`);
      const res = await axios.get(
        `${backendUrl}/api/post/getPostInfo/${postid}`
      );
      console.log(res);
      setPostData(res.data);
    } catch (err) {
      console.log("failed to get posts", err);
    }
  };
  const FetchParentComments = async (comment) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/comment/fetchNestedComments/${comment._id}`
      );

      setNestedComments((prev) => ({
        ...prev,
        [comment._id]: res.data,
      }));
    } catch (err) {
      console.log("failed to get comments", err);
    }
  };
  // finish the context swap

  return (
    <PostContext.Provider
      value={{
        postID,
        nestedComments,
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
        replyTo,
        setPostData,
        setCommentsData,
        fetchCommentCount,
        commentCount,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
}
