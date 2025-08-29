import React, { useState, useEffect } from "react";
import { IconHeart, IconMessage2, IconHeartFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import dotImage from "../Images/dot.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

const TextPost = ({ postinfo, Postuser, isOwner, refetchPosts }) => {
  const { user, backendUrl } = useAuth();
  const queryClient = useQueryClient();
  const [commentLength, setCommentLength] = useState(0);
  const [liked, setLiked] = useState(false);
  const [onMouse, setOnMouse] = useState(false);
  const [onMouseButton, setOnMouseButton] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [likeCount, setLikeCount] = useState(postinfo.likes?.length || 0);

  dayjs.extend(relativeTime);
  let timeString = dayjs(postinfo.postdate).fromNow();
  timeString = timeString
    .replace("minutes", "Mins")
    .replace("minute", "Min")
    .replace("hours", "Hrs")
    .replace("hour", "Hr")
    .replace("seconds", "Secs")
    .replace("second", "Sec")
    .replace(" ago", " ago")
    .replace("a month", "1 month");

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
    if (postinfo.likes?.includes(user?._id)) {
      setLiked(true);
    }
    setLikeCount(postinfo.likes?.length || 0);
  }, [postinfo.likes, user?._id]);

  const updateLikesMutation = useMutation({
    mutationFn: () =>
      axios.patch(
        `${backendUrl}/api/post/updatelikes/${postinfo._id}`,
        {
          userId: user?._id,
        },
        { withCredentials: true }
      ),
    onSuccess: () => {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
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
      className="bg-primary rounded-md"
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
        className={`bg-primarylighter items-center  p-3 ${
          postinfo.posttype === "ImagePost" ? "rounded-none" : "rounded-t-md"
        } flex justify-between`}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10">
            <img
              className="rounded-3xl cursor-pointer h-full w-full object-cover"
              src={
                Postuser?.profilepicture.startsWith("http")
                  ? Postuser?.profilepicture
                  : `http://localhost:5003${Postuser?.profilepicture}`
              }
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
            <div className="h-5 w-5 ">
              <img
                className="rounded-3xl cursor-pointer h-full w-full object-cover"
                src={dotImage}
                alt="Pfp"
              />

              {onMouseButton && (
                <button
                  onClick={handleDelete}
                  className="bg-secondary absolute p-1.5 text-white rounded-md text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h1 className="text-[#CFD9FC]">{postinfo.description}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-[#7d839f] text-sm"> {timeString}</h1>
          <div className="flex gap-2 items-center">
            {!isOwner && (
              <button
                onClick={handleLike}
                className="gap-1 text-[#CFD9FC]  flex w-fit h-full text-center justify-center items-center"
              >
                {liked ? (
                  <IconHeartFilled color="#CFD9FC" />
                ) : (
                  <IconHeart stroke={2} color="#CFD9FC" />
                )}
                {likeCount}
              </button>
            )}
            <Link to={`/post/${postinfo._id}`}>
              <button className="gap-1 text-[#CFD9FC] flex   w-fit h-8 text-center justify-center items-center">
                <IconMessage2 stroke={2} color="#CFD9FC" /> {commentLength}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPost;
