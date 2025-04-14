import React from "react";
import Teddybear from "../Images/TeddyBear.jpg";
const PolaroidImage = () => {
  const images = [
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
    Teddybear,
  ];
  return (
    <div className="bg-[#090B14] min-h-screen flex items-center justify-center overflow-hidden">
      <div className="flex flex-wrap gap-10 justify-center items-center w-full h-full max-h-screen overflow-hidden">
        {images.map((img, index) => (
          <div key={index} className="bg-[#CDCBB5] p-2 pb-8 h-full w-1/6">
            <img src={img} key={index} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolaroidImage;
