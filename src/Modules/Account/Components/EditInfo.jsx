import React, { useState } from "react";
import { IconX } from "@tabler/icons-react";
import TextinputOuterDesign from "./TextinputOuterDesign";

const EditInfo = () => {
  const [changeAccount, setChangeAccount] = useState("Public");
  return (
    <>
      <div></div>
      <div className="w-1/2 h-fit p-4">
        <div className="flex justify-between">
          <h1 className="text-[#E3DDF7] font-medium text-2xl">
            Edit Information
          </h1>
          <IconX stroke={2} color="white" />
        </div>
        <div>
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
            <div className="flex gap-2">
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
        </div>
      </div>
    </>
  );
};

export default EditInfo;
