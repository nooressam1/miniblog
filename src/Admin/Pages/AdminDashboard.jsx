import React, { useEffect } from "react";
import PostFilter from "../../Modules/Account/Components/PostFilter";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import AdminUserBox from "../Components/AdminUserBox";
import { useAuth } from "../../Modules/Auth/Context/authContext";
import axios from "axios";
import { useNav } from "../../Modules/Shared/Context/SearchContext";
import { useSearchParams } from "react-router-dom";
import AdminPostBox from "../Components/AdminPostBox";

const AdminDashboard = () => {
  const [textinputFocus, setTextinputFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const { user, backendUrl } = useAuth();
  const {
    searchValue,
    setValue,
    filterChoice,
    setFilterChoice,
    searchResults,
    searchValueFunc,
    setSearchValue,
  } = useNav();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter"); // default filter

  useEffect(() => {
    const filterFromUrl = searchParams.get("filter"); // pulls the value from url
    if (filterFromUrl) {
      setFilterChoice(filterFromUrl); // set the value
    }
  }, []);

  useEffect(() => {
    if (!filterChoice) return;

    const timer = setTimeout(() => {
      setSearchParams({ filter: filterChoice });

      if (searchValue) {
        searchValueFunc(searchValue, filterChoice, true);
      }
    }, 500); // waits 500 before sending request

    return () => clearTimeout(timer); //cancel the timer if user types again
  }, [filterChoice, searchValue]);

  async function allUsers() {
    const res = await axios.get(
      `${backendUrl}/api/admin/allContent/${filterChoice}`,
      { withCredentials: true }
    );
    setUsers(res.data);
  }

  useEffect(() => {
    allUsers();
  }, [filterChoice]);

  async function ButtonFunction(endpoint, method) {
    try {
      const res = await axios({
        method, // method is a string like "delete" or "patch"
        url: `${backendUrl}${endpoint}`,
        withCredentials: true,
      });
    } catch (err) {
      console.log("failed", err);
    }
  }
  return (
    <div className="w-full flex flex-col items-center justify-center px-5">
      <div className="flex w-full items-center justify-between ">
        <PostFilter
          setFilterOption={setFilterChoice}
          userAuthenticated={false}
          filterChoice={filterChoice}
          options={[{ label: "Users" }, { label: "Posts" }]}
          shortwidth
        />
        <div className="bg-secondary rounded-md p-1.5 mt-3 flex w-fit  h-fit text-center justify-center items-center">
          <input
            type="text"
            placeholder="Search"
            className={`bg-transparent border-0 focus:outline-none placeholder-[#CFD9FC] text-[#CFD9FC] 
            transition-all duration-300 ease-in-out 
            
            
          `}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IconSearch color="white" stroke={2} />
        </div>
      </div>
      <div className="w-full bg-primarylighter rounded-md">
        {filterChoice === "Users" && (
          <>
            <div className="w-full bg-primary grid grid-cols-5 rounded-md  p-4 text-center text-white ">
              <h1>Username</h1> <h1>Date Create</h1> <h1>Account Status</h1>{" "}
              <h1>Account Role</h1>
              <h1>Action</h1>
            </div>
            {searchValue && searchResults.length === 0 ? (
              <h1 className="text-gray-500 w-full text-center p-4">
                User not found
              </h1>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <AdminUserBox
                  User={user}
                  handleDelete={() => {
                    ButtonFunction(
                      `/api/account/deleteUser/${user._id}`,
                      "delete"
                    );
                    setUsers((prev) =>
                      prev.filter((users) => users._id !== user._id)
                    );
                  }}
                  banUser={() => {
                    ButtonFunction(`/api/admin/banUser/${user._id}`, "patch");
                    setUsers((prev) =>
                      prev.map((u) =>
                        u._id === user._id
                          ? {
                              ...u,
                              status:
                                u.status === "Banned" ? "Active" : "Banned",
                            }
                          : u
                      )
                    );
                  }}
                  changeRole={() => {
                    ButtonFunction(
                      `/api/admin/changeRole/${user._id}`,
                      "patch"
                    );
                    setUsers((prev) =>
                      prev.map((u) =>
                        u._id === user._id
                          ? {
                              ...u,
                              role: u.role === "User" ? "Admin" : "User",
                            }
                          : u
                      )
                    );
                  }}
                  key={user._id}
                />
              ))
            ) : (
              users.map((user) => (
                <AdminUserBox
                  User={user}
                  handleDelete={() => {
                    ButtonFunction(
                      `/api/account/deleteUser/${user._id}`,
                      "delete"
                    );
                    setUsers((prev) =>
                      prev.filter((users) => users._id !== user._id)
                    );
                  }}
                  banUser={() => {
                    ButtonFunction(`/api/admin/banUser/${user._id}`, "patch");
                    setUsers((prev) =>
                      prev.map((u) =>
                        u._id === user._id
                          ? {
                              ...u,
                              status:
                                u.status === "Banned" ? "Active" : "Banned",
                            }
                          : u
                      )
                    );
                  }}
                  changeRole={() => {
                    ButtonFunction(
                      `/api/admin/changeRole/${user._id}`,
                      "patch"
                    );
                    setUsers((prev) =>
                      prev.map((u) =>
                        u._id === user._id
                          ? {
                              ...u,
                              role: u.role === "User" ? "Admin" : "User",
                            }
                          : u
                      )
                    );
                  }}
                  key={user._id}
                />
              ))
            )}
          </>
        )}
        {filterChoice === "Posts" && (
          <>
            <div className="w-full bg-primary grid grid-cols-6 rounded-md  p-4 text-center text-white ">
              <h1>Post ID</h1> <h1>User</h1> <h1>Post type</h1>
              <h1>Post Create</h1> <h1>Likes</h1>
              <h1>Action</h1>
            </div>
            {searchValue && searchResults.length === 0 ? (
              <h1 className="text-gray-500 w-full text-center p-4">
                User not found
              </h1>
            ) : searchResults.length > 0 ? (
              searchResults.map((post) => (
                <AdminPostBox
                  handleDeletePost={() => {
                    ButtonFunction(
                      `/api/post/deletePost/${post._id}`,
                      "delete"
                    );
                    setUsers((prev) =>
                      prev.filter((user) => user._id !== post._id)
                    );
                  }}
                  Post={post}
                  key={post._id}
                />
              ))
            ) : (
              users.map((post) => (
                <AdminPostBox
                  handleDeletePost={() => {
                    ButtonFunction(
                      `/api/post/deletePost/${post._id}`,
                      "delete"
                    );
                    setUsers((prev) =>
                      prev.filter((user) => user._id !== post._id)
                    );
                  }}
                  Post={post}
                  key={post._id}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
