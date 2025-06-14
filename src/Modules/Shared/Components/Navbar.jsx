import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-24 pl-8 pr-5 p-2">
      <div className="flex w-full h-full justify-between items-center">
        <Link to="/">
          <h1 className="text-[#CFD9FC] font-bold text-2xl">EmberPages</h1>
        </Link>
        <div className="grid h-full  grid-cols-[50px_1fr] justify-center items-center">
          <div className="h-2/5 w-2/3">
            <button className="bg-[#B36ABE] rounded-md  flex w-full h-full text-center justify-center items-center">
              <IconSearch color="white" stroke={2} />
            </button>
          </div>
          <Link to={"/profile/" + "David%20Kim"}>
            <div className="flex gap-2 w-full h-full justify-between items-center">
              <div className="flex w-full h-full justify-center items-center">
                <IconUserCircle color="white" stroke={2} />
              </div>

              <h1 className="text-[#CFD9FC] font-thin text-xl">Username</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
