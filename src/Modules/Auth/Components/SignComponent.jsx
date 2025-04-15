import React from "react";
import WhiteTextinput from "../../Shared/Components/WhiteTextinput";
import BlueButton from "../../Shared/Components/BlueButton";
const SignComponent = ({ ChangePage }) => {
  return (
    <div
      style={{ boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)" }}
      className="w-full pt-14 pb-14 absolute max-w-md mx-auto p-6 flex flex-col justify-center items-center rounded-xl bg-[#20284E] my-8 md:my-16 lg:my-24"
    >
      <h1 className="w-full text-center mb-2 font-bold text-3xl md:text-4xl text-[#CFD9FC]">
        Sign in
      </h1>

      <div className="flex flex-col gap-4 w-full mt-5 px-4">
        <WhiteTextinput placeholder={"Username"} />
        <WhiteTextinput placeholder={"Email"} />

        <WhiteTextinput placeholder={"Password"} />
        <WhiteTextinput placeholder={"Confirm password"} />
      </div>
      <div className="w-full ">
        <BlueButton title={"Login"} />
      </div>
      <p className="w-full text-center mt-4 text-sm md:text-md text-[#CFD9FC]  px-4">
        Have an account?{" "}
        <span onClick={ChangePage} className="text-[#B36ABE] cursor-pointer hover:underline">
          Login
        </span>
      </p>
    </div>
  );
};

export default SignComponent;
