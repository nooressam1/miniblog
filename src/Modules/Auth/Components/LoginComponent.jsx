import React from "react";
import WhiteTextinput from "../../Shared/Components/WhiteTextinput";
import BlueButton from "../../Shared/Components/BlueButton";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../Context/authContext";
const LoginComponent = ({ ChangePage }) => {
  const backendUrl = "http://localhost:5003";
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${backendUrl}/api/auth/login `, {
          username: values.username,
          password: values.password,
        });
        login(response.data.user);
      } catch (err) {
        const msg = err.response.data?.message;
        console.log(msg);
        if (msg && msg.toLowerCase().includes("user"))
          formik.setFieldError("username", msg);
        else if (msg && msg.toLowerCase().includes("password"))
          formik.setFieldError("password", msg);
        console.error("Login Error:", err);
      }
    },
  });

  return (
    <div
      style={{ boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)" }}
      className="w-full h-[500px] px-10 py-10 absolute max-w-md mx-auto p-6 flex flex-col justify-center items-center rounded-xl bg-[#20284E] my-8 md:my-16 lg:my-24"
    >
      <h1 className="w-full text-center mb-2 font-bold text-3xl md:text-4xl text-[#CFD9FC]">
        Login
      </h1>
      <h1 className="w-full text-center text-sm md:text-md text-[#B36ABE]">
        Please login to your account
      </h1>
      <div className="flex flex-col w-full mt-2 px-5">
        <form onSubmit={formik.handleSubmit}>
          <WhiteTextinput
            type="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            placeholder={"Username"}
            errormessage={formik.errors.username}
            condition={formik.touched.username && formik.errors.username}
          />
          <WhiteTextinput
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder={"Password"}
            errormessage={formik.errors.password}
            condition={formik.touched.password && formik.errors.password}
          />
        </form>
      </div>
      <div className="w-full ">
        <BlueButton Operation={formik.handleSubmit} title={"Login"} />
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
