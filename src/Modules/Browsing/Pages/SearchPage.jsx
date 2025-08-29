import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";
import QuickPost from "../../Shared/Components/QuickPost";
import FilterButton from "../../Shared/Components/FilterButton";
import TextPost from "../../Shared/Components/TextPost";
import { useAuth } from "../../Auth/Context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostFilter from "../../Account/Components/PostFilter";
import { useNav } from "../../Shared/Context/SearchContext";
import UserSearchBox from "../Components/UserSearchBox";

const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };
const backendUrl = "http://localhost:5003";

export const SearchPage = () => {
  const { user } = useAuth();
  const {
    searchValue,
    setValue,
    filterChoice,
    setFilterChoice,
    searchResults,
    searchValueFunc,
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

    setSearchParams({ filter: filterChoice }); // sets the value in url

    if (searchValue) {
      searchValueFunc(searchValue, filterChoice);
    }

    console.log("testing123", filterChoice);
  }, [filterChoice, searchValue]);

  return (
    <>
      <PostFilter
        setFilterOption={setFilterChoice}
        userAuthenticated={false}
        filterChoice={filterChoice}
        option1="Users"
        option2="Posts"
      />
      <div className="flex flex-col justify-center">
       
          {searchResults.length < 1 ? (
          <h1 className="text-gray-600 w-full  text-center text-md font-sm">
              No results avaviable
            </h1>
          ) : (
            <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full gap-8 p-8"
          columnClassName="space-y-8"
        >
           { searchResults.map((post) => (
              <>
                {filterChoice === "Posts" ? (
                  <TextPost
                    key={post._id}
                    Postuser={post.user}
                    postinfo={post}
                  />
                ) : (
                  <UserSearchBox User={post}></UserSearchBox>
                )}
              </>
            )       
)}  </Masonry>
          )}
      </div>
    </>
  );
};
