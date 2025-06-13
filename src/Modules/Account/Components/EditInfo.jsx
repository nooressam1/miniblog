import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";
import TextinputOuterDesign from "./TextinputOuterDesign";
import BannerTest from "../Images/BannerTest.webp";
import { IconPencil } from "@tabler/icons-react";
import NullPfp from "../Images/nullpfp.jpg";
const EditInfo = () => {
  const [changeAccount, setChangeAccount] = useState("Public");
  const [image, setImage] = useState(NullPfp);
    const [Banner, setBanner] = useState(NullPfp);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview the image
    }
  };  
  const handleBannerChange = (e) =>{
    const file = e.target.files[0];
    if(file)
    {
      setBanner(URL.createObjectURL(file));
    }
  }

  return (
    <>
      <div></div>
      <div className="w-[60vw] h-fit p-4 ">
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
                className={` text-white whitespace-nowrap rounded-md p-3 w-full ${
                  changeAccount === "Public"
                    ? "  bg-[#A30BA8] border-none "
                    : "bg-transparent   border-white border-2  "
                }`}
              >
                Public Account
              </button>
              <button
                onClick={() => setChangeAccount("Private")}
                className={` text-white whitespace-nowrap p-3 rounded-md w-full ${
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
            <div className="relative">
              <h1 className="text-[#E3DDF7] font-medium text-lg pt-3 pb-3">
                Profile Picture{" "}
              </h1>
              <div className="w-40 h-52 md:w-52 md:h-60 rounded-lg ">
                <img
                  className="w-full h-full object-cover rounded-2xl object-center"
                  alt="pfp"
                  src={image}
                />

                <div className="absolute bottom-0 right-0">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="imageInput"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {/* Label with image acting as the button */}
                  <label htmlFor="imageInput" className="cursor-pointer ">
                    <div className="p-3 w-fit rounded-full bg-[#7E96F6]">
                      <IconPencil size={32} color="white" stroke={2} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full">
              <h1 className="text-[#E3DDF7] font-medium text-lg pt-3 pb-3">
                Banner
              </h1>
              <div className="w-full h-52 relative  md:h-60 rounded-lg">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  alt="Banner"
                  src={Banner}
                />
                <div className="absolute bottom-0 right-0">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    id="BannerimageInput"
                    onChange={handleBannerChange}
                    className="hidden"
                  />

                  {/* Label with image acting as the button */}
                  <label htmlFor="BannerimageInput" className="cursor-pointer ">
                    <div className="p-3 w-fit rounded-full bg-[#7E96F6]">
                      <IconPencil size={32} color="white" stroke={2} />
                    </div>
                  </label>
                </div>
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
