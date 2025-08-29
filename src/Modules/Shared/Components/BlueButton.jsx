import React from "react";

const BlueButton = ({ title, Operation }) => {
  return (
    <div className="w-full h-auto mt-5 flex justify-center items-center">
      <button
        onClick={() => {
          Operation()
        }}
        className="w-[65%] h-fit font-bold hover:bg-secondarylighter text-xl text-white p-3 rounded-md bg-secondary"
      >
        {title}
      </button>
    </div>
  );
};

export default BlueButton;
