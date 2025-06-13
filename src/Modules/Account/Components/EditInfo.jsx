import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";
import TextinputOuterDesign from "./TextinputOuterDesign";
import BannerTest from "../Images/BannerTest.webp";

const EditInfo = () => {
  const [changeAccount, setChangeAccount] = useState("Public");
    const [image, setImage] = useState(null);
const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview the image
    }
  };
  return (
    <>
      <div></div>
      <div className="w-1/2 h-fit p-4 ">
        <div className="flex justify-between">
          <h1 className="text-[#E3DDF7] font-medium text-2xl">
            Edit Information
          </h1>
          <IconX stroke={2} color="white" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-[#E3DDF7] font-medium text-lg pt-3 pb-3">
            Account Information
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <TextinputOuterDesign
              onChangeText=""
              text="Username"
              placeholder="username"
            ></TextinputOuterDesign>
            <TextinputOuterDesign
              onChangeText=""
              text="Username"
              placeholder="username"
            ></TextinputOuterDesign>
            <TextinputOuterDesign
              onChangeText=""
              text="Username"
              placeholder="username"
            ></TextinputOuterDesign>
            <TextinputOuterDesign
              onChangeText=""
              text="Username"
              placeholder="username"
            ></TextinputOuterDesign>
            <div className="flex gap-4 ">
              <button
                onClick={() => setChangeAccount("Public")}
                className={` text-white  rounded-md h-12 w-full ${
                  changeAccount === "Public"
                    ? "  bg-[#A30BA8] border-none "
                    : "bg-transparent   border-white border-2  "
                }`}
              >
                Public Account
              </button>
              <button
                onClick={() => setChangeAccount("Private")}
                className={` text-white  rounded-md h-12 w-full ${
                  changeAccount === "Private"
                    ? "  bg-[#A30BA8] border-none "
                    : "bg-transparent   border-white border-2  "
                }`}
              >
                Private Account
              </button>
            </div>
          </div>
          <div className="flex gap-5 w-full ">
            <div>
              <h1 className="text-[#E3DDF7] font-medium text-lg pt-3 pb-3">
                Profile Picture{" "}
              </h1>
              <div className="w-40 h-52 md:w-52 md:h-60 rounded-lg ">
                <img
                  className="w-full h-full object-cover rounded-2xl object-center"
                  alt="pfp"
                  src={image}
                />
              </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />

            </div>
            <div className="w-full">
              <h1 className="text-[#E3DDF7] font-medium text-lg pt-3 pb-3">
                Banner
              </h1>
              <div className="w-full h-52  md:h-60 rounded-lg">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  alt="Banner"
                  src="https://i.pinimg.com/originals/c8/4f/b7/c84fb740471d58ba9597ace28969d490.gif"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end mt-7 ">
          <div className="flex w-fit gap-4">
            <button
              onClick={() => setChangeAccount("Private")}
              className=" text-white  bg-[#A30BA8] whitespace-nowrap p-2 rounded-md h-12 w-full"
            >
              Save changes
            </button>
            <button
              onClick={() => setChangeAccount("Private")}
              className=" text-white  bg-[#7E96F6] whitespace-nowrap p-2 rounded-md h-12 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditInfo;
