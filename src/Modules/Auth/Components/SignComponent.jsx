import React from "react";
import WhiteTextinput from "../../Shared/Components/WhiteTextinput";
import BlueButton from "../../Shared/Components/BlueButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useAuth} from "../Context/authContext"
import { useNavigate } from "react-router-dom";

const SignComponent = ({ ChangePage }) => {
  const backendUrl = "http://localhost:5003";
  const {login} = useAuth();
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(6).max(10).required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted:", values);

      try {
        const response = await axios.post(`${backendUrl}/api/auth/register`, {
          username: values.username,
          email: values.email,
          password: values.password,
        }, {withCredentials: true});
        console.log(response.data);

        login(response.data.user, response.data.accessToken);
                navigate("/", { replace: true });

      } catch (error) {
        if (error.response) {
          const msg = error.response.data?.message?.toLowerCase();
          if (msg && msg?.includes("email")) formik.setFieldError("email", msg);
          else if (msg && msg?.includes("username"))
            formik.setFieldError("username", msg);
        }
      }
    },
  });
  return (
    <div
      style={{ boxShadow: "inset 0 4px 8px rgba(0,0,0,0.2)" }}
      className="w-full h-[500px]  px-10 py-10 absolute max-w-md mx-auto p-6 flex flex-col justify-center items-center rounded-xl bg-[#20284E] my-8 md:my-16 lg:my-24"
    >
      <h1 className="w-full text-center mb-2 font-bold text-3xl md:text-4xl text-[#CFD9FC]">
        Sign in
      </h1>
      <h1 className="w-full text-center text-sm md:text-md text-lightBlue">
        Create new account
      </h1>
      <div className="flex flex-col  w-full  px-4">
        <WhiteTextinput
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errormessage={formik.errors.username}
          condition={formik.touched.username && formik.errors.username}
        />

        <WhiteTextinput
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errormessage={formik.errors.email}
          condition={formik.touched.email && formik.errors.email}
        />

        <WhiteTextinput
          name="password"
          placeholder="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errormessage={formik.errors.password}
          condition={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="w-full ">
        <BlueButton Operation={formik.handleSubmit} title={"Login"} />
      </div>
      <p className="w-full text-center mt-4 text-sm md:text-md text-[#CFD9FC]  px-4">
        Have an account?{" "}
        <span
          onClick={ChangePage}
          className="text-lightBlue cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default SignComponent;
