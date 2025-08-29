import React, { useState } from "react";
import { IconX, IconPencil } from "@tabler/icons-react";
import TextinputOuterDesign from "./TextinputOuterDesign";
import NullPfp from "../Images/nullpfp.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../Auth/Context/authContext";
import { useNavigate } from "react-router-dom";

const EditInfo = ({ setOpenEditInfo }) => {
  const { user, backendUrl } = useAuth();

  const [changePassword, setChangePassword] = useState(false);
  const [image, setImage] = useState(NullPfp);
  const [banner, setBanner] = useState(NullPfp);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [bannerPictureFile, setBannerPictureFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setProfilePictureFile(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
      setBannerPictureFile(file);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
      description: user?.description,
    },
    validationSchema: Yup.object({
      username: Yup.string().min(6, "Minimum 6").max(10, "Max 10"),
      description: Yup.string().min(6, "Minimum 1").max(10, "Max 100"),
      email: Yup.string().email("Invalid email"),
      password: Yup.string().min(6, "Minimum 6 characters"),
      confirmPassword: Yup.string().min(6, "Minimum 6 characters"),
    }),
    onSubmit: async (values) => {
      console.log(user.username);

      try {
        const formData = new FormData();
        console.log(user.username);
        if (profilePictureFile) {
          formData.append("profilePicture", profilePictureFile);
        }

        if (bannerPictureFile) {
          formData.append("bannerPicture", bannerPictureFile);
        }
        if (values.description) {
          formData.append("description", values.description);
        }
        formData.append("username", values.username);

        formData.append("email", values.email);
        if (changePassword) {
          formData.append("password", values.password);
          formData.append("confirmPassword", values.confirmPassword);
        }
        for (let pair of formData.entries()) {
          console.log(pair[0] + ":", pair[1]);
        }
        console.log("Profile updated:", values.description);

        const response = await axios.patch(
          `${backendUrl}/api/account/updateInformation/${user._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            withCredentials: true,
          }
        );
        navigate(`/profile/${response.data.user.username}`, { replace: true });
        window.location.reload();
        setOpenEditInfo(false);
      } catch (error) {
        if (error.response) {
          const msg = error.response.data?.message?.toLowerCase();
          if (msg?.includes("email")) formik.setFieldError("email", msg);
          else if (msg?.includes("username"))
            formik.setFieldError("username", msg);
        }
      }
    },
  });

  return (
    <>
      <div className="fixed inset-0 bg-background bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-background p-7 rounded-lg w-[90vw] md:w-[60vw] max-h-[95vh] overflow-y-auto">
          <div className="flex justify-between">
            <h1 className="text-[#E3DDF7] font-medium text-2xl">
              Edit Information
            </h1>
            <button onClick={() => setOpenEditInfo(false)}>
              <IconX stroke={2} color="white" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <h1 className="text-[#E3DDF7] font-medium text-lg pt-3">
              Account Information
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <TextinputOuterDesign
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="username"
              />
              <TextinputOuterDesign
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="Email"
                placeholder="Email"
              />
              <TextinputOuterDesign
                name="password"
                onFocus={() => setChangePassword(true)}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
              <div className={changePassword ? "visible" : "invisible"}>
                <TextinputOuterDesign
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Password"
                />
              </div>
            </div>
            <TextinputOuterDesign
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Description"
            />
            <div className="flex gap-5 w-full">
              <div className="relative h-f">
                <h1 className="text-[#E3DDF7] font-medium text-lg pb-3">
                  Profile Picture
                </h1>
                <div className="w-40 relative h-52 md:w-52 md:h-52 rounded-lg">
                  <img
                    className="w-full h-full object-cover rounded-2xl object-center"
                    alt="pfp"
                    src={
                      user.profilepicture.startsWith("http")
                        ? user.profilepicture
                        : `http://localhost:5003${user.profilepicture}`
                    }
                  />
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="imageInput" className="cursor-pointer">
                      <div className="p-3 w-fit rounded-full bg-[#7E96F6]">
                        <IconPencil size={32} color="white" stroke={2} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-[#E3DDF7] font-medium text-lg pb-3">
                  Banner
                </h1>
                <div className="w-full h-52 relative md:h-52 rounded-lg">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    alt="Banner"
                    src={
                      user.banner.startsWith("http")
                        ? user.banner
                        : `http://localhost:5003${user.banner}`
                    }
                  />
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      id="BannerimageInput"
                      onChange={handleBannerChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="BannerimageInput"
                      className="cursor-pointer"
                    >
                      <div className="p-3 w-fit rounded-full bg-[#7E96F6]">
                        <IconPencil size={32} color="white" stroke={2} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end mt-4">
              <div className="flex w-fit gap-4">
                <button
                  type="submit"
                  disabled={
                    !formik.dirty && !profilePictureFile && !bannerPictureFile
                  }
                  className={`text-white bg-secondary hover:bg-secondarylighter whitespace-nowrap p-2 rounded-md h-12 w-full ${
                    !formik.dirty && !profilePictureFile && !bannerPictureFile
                      ? "opacity-50 "
                      : ""
                  } `}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setOpenEditInfo(false)}
                  className="text-gray-400 bg-secondary whitespace-nowrap p-2 rounded-md h-12 w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditInfo;
