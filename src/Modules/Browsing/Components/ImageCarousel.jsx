import React, { useState } from "react";
import testphoto from "../../Auth/Images/TestPhoto.jpg";
import teddyBear from "../../Auth/Images/TeddyBear.jpg";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from "@tabler/icons-react";

const ImageCarousel = ({postPhoto}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    if (currentImage === postPhoto.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };
   const handlePrevImage = () => {
    if (currentImage === 0) {
      setCurrentImage(postPhoto.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };
  return (
    <div className="relative md:h-[650px] w-[550px] h-[550px] md:w-[650px]  ">
  <img
        src={`http://localhost:5003${postPhoto[currentImage]}`}
        alt="carousel"
        className="md:rounded-l-md md:rounded-tr-none rounded-t-md rounded-bl-none h-full w-full object-cover"
      />

    

      {/* Left Arrow */}
      <button
        onClick={handlePrevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 hover:bg-black/20 text-white p-2 rounded"
      >
        <IconChevronCompactLeft color="white" stroke={2} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:bg-black/20 white p-2 rounded"
      >
        <IconChevronCompactRight color="white" stroke={2} />
      </button>
    </div>
  );
};

export default ImageCarousel;
