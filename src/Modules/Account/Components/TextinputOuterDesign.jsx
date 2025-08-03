import React from "react";

const TextinputOuterDesign = ({
  onChange,
  onBlur,
  placeholder,
  onFocus,
  name,
  value,
  type = "text",
}) => {
  return (
    <div className="w-full ">
      <input
        type={type}
        id={name}
        name={name}
        className="bg-transparent w-full p-3 border-white border-2 text-white rounded-md"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        onFocus={onFocus}
        placeholder={placeholder}
      />{" "}
    </div>
  );
};

export default TextinputOuterDesign;
