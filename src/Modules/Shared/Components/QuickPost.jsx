import React, { useEffect, useState } from "react";
import { IconPencil, IconPlus, IconSend2, IconX } from "@tabler/icons-react";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";

const QuickPost = () => {
  const [focusState, setFocusState] = useState(false);
  const [savedImages, setSavedImages] = useState([]); // now an array
  const [savedImagesFiles, setSavedImagesFiles] = useState([]); // save image files

  const [saveDescription, setSaveDescription] = useState("");
  const backendUrl = "http://localhost:5003";
  const { savedToken } = useAuth();
  const handlePostImage = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setSavedImages((prev) => [...prev, ...imageURLs]);
    setSavedImagesFiles((prev) => [...prev, ...files]);
  };
  const handleUpload = async () => {
    try {
      const posttype = savedImages.length > 0 ? "ImagePost" : "textPost";

      const formData = new FormData();
      formData.append("posttype", posttype);
      formData.append("description", saveDescription);

      // to save images one by one
      savedImagesFiles.forEach((file) => {
        formData.append("postimages", file);
      });
      const response = await axios.post(
        `${backendUrl}/api/post/uploadpost`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${savedToken}`, // ✅ make sure token exists
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Post uploaded:", response.data);

      // Clear inputs on success
      setSaveDescription("");
      setSavedImages([]);
      setSavedImagesFiles([]);
      setFocusState(false);
    } catch (error) {
      console.error("Upload failed:", error.response || error.message);
    }
  };

  return (
    <div
      className={`w-full ${
        focusState ? (savedImages.length > 0 ? "h-96" : "h-32") : "h-14"
      } transition-all px-4 duration-300 flex justify-center items-start`}
    >
      <div
        className={`bg-[#20284E] w-full overflow-auto h-full transition-all duration-300 p-2 rounded-md flex ${
          focusState ? "flex-col items-start" : "flex-row items-center"
        } justify-between gap-3`}
      >
        {/* Uploaded images preview */}
        {savedImages.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {savedImages.map((image, index) => (
              <div
                key={index}
                className="w-[200px] h-64 relative rounded-lg overflow-hidden"
              >
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={image}
                  alt={`Uploaded ${index}`}
                />
                <button
                  className="absolute top-0 right-0"
                  onClick={() => {
                    setSavedImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                    setSavedImagesFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <div className="p-1 m-2 w-fit rounded-full bg-[#B36ABE]">
                    <IconX size={25} color="white" stroke={2} />
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text area */}
        <textarea
          className="bg-transparent text-[#CFD9FC] w-full h-full overflow-hidden
            resize-none focus:outline-none align-top placeholder:text-[#8A94B9]
            p-2 rounded-md leading-tight"
          placeholder="Something on your mind?"
          value={saveDescription}
          onChange={(e) => setSaveDescription(e.target.value)}
          onFocus={() => setFocusState(true)}
          onBlur={() =>
            savedImages.length > 0 ? setFocusState(true) : setFocusState(false)
          }
        />

        {/* Action buttons */}
        <div
          className={`flex gap-2 ${
            focusState ? "self-end mt-auto" : ""
          } transition-all duration-300`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            id="BannerimageInput"
            onChange={handlePostImage}
            className="hidden"
          />

          <label htmlFor="BannerimageInput" className="cursor-pointer">
            <div
              onClick={() => {
                setFocusState(true);
              }}
              className="bg-[#A30BA8] p-2 rounded-md flex justify-center items-center"
            >
              <IconPlus color="white" stroke={2} />
            </div>
          </label>

          <button
            onClick={() => {
              handleUpload();
            }}
            className="bg-[#A30BA8] p-2 rounded-md flex justify-center items-center"
          >
            <IconSend2 color="white" stroke={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickPost;
