import React from "react";

const WhiteTextinput = ({
  placeholder,
  type,
  name,
  onChange,
  onBlur,
  value,
  errormessage,
  condition,
}) => {
  return (
    <div className="w-full flex flex-col justify-center mt-4 items-center">
      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        className=" w-full p-2 bg-transparent  placeholder-[#CFD9FC] rounded-md text-[#CFD9FC] border-white border"
        placeholder={placeholder}
      />
      {condition && (
        <p className="mt-2 w-full text-sm text-red-500">{errormessage}</p>
      )}
    </div>
  );
};

export default WhiteTextinput;
