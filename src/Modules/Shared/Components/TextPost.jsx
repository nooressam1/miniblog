import React, { useState, useEffect } from "react";
import { IconHeart, IconMessage2, IconHeartFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import dotImage from "../Images/dot.png";

const TextPost = ({ postinfo, Postuser, isOwner, refetchPosts }) => {
  const { user, backendUrl } = useAuth();
  const queryClient = useQueryClient();
  const [commentLength, setCommentLength] = useState(0);
  const [liked, setLiked] = useState(false);
  const [onMouse, setOnMouse] = useState(false);
  const [onMouseButton, setOnMouseButton] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postinfo, Postuser]);

  useEffect(() => {
    if (user?._id && Postuser?._id) {
      setAuthenticated(user._id === Postuser?._id);
    } else {
      setAuthenticated(false);
    }
  }, [user, Postuser]);

  const fetchComments = async () => {
    const comments = await axios.get(
      `${backendUrl}/api/comment/fetchComments/${postinfo._id}`,
      { params: { getAll: true } }
    );
    setCommentLength(comments.data.length);
  };

  useEffect(() => {
    if (postinfo.likes.includes(user?._id)) {
      setLiked(true);
    }
  }, [postinfo.likes, user?._id]);

  const updateLikesMutation = useMutation({
    mutationFn: () =>
      axios.patch(`${backendUrl}/api/post/updatelikes/${postinfo._id}`, {
        userId: user?._id,
      }),
    onSuccess: () => {
      setLiked((prev) => !prev);
      refetchPosts();
    },
    onError: (error) => {
      console.error("Failed to like post:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(
          `${backendUrl}/api/post/deletePost/${postinfo._id}`
        );
        console.log("deleted comment", res);
        return res.data; // return for React Qury
      } catch (err) {
        console.error("deleted failed:", err);
        throw err; // trigger onError
      }
    },
    onSuccess: () => {
      refetchPosts();
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
      className="bg-[#20284E] rounded-md"
      onMouseEnter={() => {
        setOnMouse(true);
      }}
      onMouseLeave={() => setOnMouse(false)}
    >
      {postinfo.posttype === "ImagePost" && (
        <div className="h-1/3 w-full">
          <img
            src={`http://localhost:5003${postinfo.postimages[0]}`}
            alt="postImage"
            className="rounded-t-lg h-full w-full object-cover"
          />
        </div>
      )}
      <div
        className={`bg-[#7E96F6] items-center  p-3 ${
          postinfo.posttype === "ImagePost" ? "rounded-none" : "rounded-t-md"
        } flex justify-between`}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10">
            <img
              className="rounded-3xl cursor-pointer h-full w-full object-cover"
              src={`http://localhost:5003${Postuser?.profilepicture}`}
              alt="Pfp"
            />
          </div>
          <Link to={`/profile/${Postuser?.username}`}>
            <h1 className="text-[#E4EAFF] capitalize cursor-pointer">
              {Postuser?.username}
            </h1>
          </Link>
        </div>
        {authenticated && onMouse && (
          <div
            onMouseEnter={() => setOnMouseButton(true)}
            onMouseLeave={() => setOnMouseButton(false)}
            className="relative inline-block"
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
                onClick={handleDelete}
                className="bg-[#B36ABE] absolute p-1.5 text-white rounded-md text-sm"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <h1 className="text-[#CFD9FC]">{postinfo.description}</h1>
        <div className="flex gap-2 justify-end items-center">
          {!isOwner && (
            <button
              onClick={handleLike}
              className="gap-1 text-[#CFD9FC] rounded-xl  flex w-[10%] h-full text-center justify-center items-center"
            >
              {liked ? (
                <IconHeartFilled color="#CFD9FC" />
              ) : (
                <IconHeart stroke={2} color="#CFD9FC" />
              )}
              {postinfo.likes.length}
            </button>
          )}
          <Link to={`/post/${postinfo._id}`}>
            <button className="rounded-xl gap-1 text-[#CFD9FC] flex  h-8 text-center justify-center items-center">
              <IconMessage2 stroke={2} color="#CFD9FC" /> {commentLength}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TextPost;
