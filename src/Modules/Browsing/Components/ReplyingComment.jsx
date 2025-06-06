import React, { useRef, useState } from "react";
import { IconHeart } from "@tabler/icons-react";
import { IconHeartFilled } from "@tabler/icons-react";
import PfpExample from "../../Shared/Images/PfpExample.jpg";
import Saved from "../../Shared/Images/Saved.png";
import Unsaved from "../../Shared/Images/Unsaved.png";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import { IconMessage2 } from "@tabler/icons-react";
import { IconSend2 } from "@tabler/icons-react";
const ReplyingComment = ({
  userName,
  captionText,
  profilePicture,
  postType,
  postPhoto,
}) => {
  const [likePost, setLikePost] = useState(false);
  const [savePost, setSavePost] = useState(false);
  const [focusState, setFocusState] = useState(false);
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  };
  return (
    <div className="bg-[#20284E] ml-8  items-center w-[71.5%] justify-between  rounded-md flex p-3 ">
      <div className=" gap-2 items-center w-full ">
        <h1 className="text-[#8194D4] text-sm cursor-pointer  capitalize ">
          Replied to @{userName}
        </h1>
        <textarea
          ref={textareaRef}
          rows={1}
          className="bg-transparent mt-2 text-[#dde2f6] w-full overflow-hidden resize-none focus:outline-none placeholder:text-[#dde2f6]"
          placeholder="Something on your mind?"
          onInput={handleInput}
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
        />
      </div>

      {/* Main content area with flex-grow */}
      <div className="flex items-end justify-end  h-full ">
        <div className="flex gap-2 ">
          <button
            onClick={() => setSavePost(!savePost)}
            className="bg-[#B36ABE] hover:bg-[#da85e7] rounded-xl p-1 flex w-9 h-8 text-center justify-center items-center"
          >
            <IconSend2 stroke={2} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyingComment;
