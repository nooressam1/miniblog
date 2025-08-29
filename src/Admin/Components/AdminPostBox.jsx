import { IconPencil } from "@tabler/icons-react";
import React, { useState } from "react";

const AdminPostBox = ({ Post, handleDeletePost }) => {
  const [onMouseButton, setOnMouseButton] = useState(false);

  return (
    <div className="grid grid-cols-6 p-4 text-white capitalize">
      <h1 className="w-full text-left break-words">{Post?._id}</h1>
      <h1 className="w-full text-center">{Post.user?.username}</h1>
      <h1 className="w-full text-center">{Post.posttype}</h1>

      <h1 className="w-full text-center">
        {Post.postdate ? Post.postdate : "none"}
      </h1>
      <h1 className="w-full text-center">{Post.likes?.length}</h1>

      <div
        onMouseEnter={() => setOnMouseButton(true)}
        onMouseLeave={() => setOnMouseButton(false)}
        className="relative flex"
      >
        <div className="w-full flex justify-center">
          <IconPencil color="white" stroke={2} />
        </div>
        {onMouseButton && (
          <div className="absolute flex  bg-secondary rounded-md ">
            <button
              onClick={() => handleDeletePost(Post._id)}
              className="  p-1.5 px-4 text-white hover:bg-secondarylighter rounded-t-md text-sm"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPostBox;
