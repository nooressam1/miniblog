import React from "react";

const TextinputOuterDesign = ({ onChangeText, text, placeholder }) => {
  return (
    <div className="w-full ">
      <input
        type="text"
        className="bg-transparent w-full p-3 border-white border-2 text-white rounded-md"
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default TextinputOuterDesign;
