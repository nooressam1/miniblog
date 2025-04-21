import React from "react";
import WhiteTextinput from "../../Shared/Components/WhiteTextinput";
import BlueButton from "../../Shared/Components/BlueButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginComponent = ({ ChangePage }) => {
  const LoginSchema = Yup.object({
    Username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  return (
    <div
      style={{ boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)" }}
      className="w-full pt-14 pb-14 absolute max-w-md mx-auto p-6 flex flex-col justify-center items-center rounded-xl bg-[#20284E] my-8 md:my-16 lg:my-24"
    >
      <h1 className="w-full text-center mb-2 font-bold text-3xl md:text-4xl text-[#CFD9FC]">
        Login
      </h1>
      <h1 className="w-full text-center text-sm md:text-md text-[#B36ABE]">
        Please login to your account
      </h1>
      <div className="flex flex-col w-full mt-5 ">
        <Formik
          initialValues={{ Username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Form>
              <WhiteTextinput
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder={"Username"}
              />
              <WhiteTextinput
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder={"Password"}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className="w-full ">
        <BlueButton title={"Login"} />
      </div>
      <p className="w-full text-center mt-4 text-sm md:text-md text-[#CFD9FC]  px-4">
        Don't have an account?{" "}
        <span
          onClick={ChangePage}
          className="text-[#B36ABE] cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginComponent;
