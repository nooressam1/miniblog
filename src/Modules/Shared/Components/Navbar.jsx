import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { IconUserCircle } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <div className="w-full h-14 pl-8 pr-5 p-2">
      <div className="flex w-full h-full justify-between items-center">
        <h1 className="text-[#CFD9FC] font-bold text-2xl">EmberPages</h1>
        <div className="grid h-full gap-5 grid-cols-[50px_1fr]  justify-center items-center">
          <div className="h-2/3 w-2/3">
            <button className="bg-[#B36ABE] rounded-md  flex w-full h-full text-center justify-between items-center">
              <IconSearch color="white" stroke={2} />
            </button>
          </div>
          <div className="flex w-full h-full justify-between items-center">
            <div>
              <IconUserCircle color="white" stroke={2} />
            </div>

            <h1 className="text-[#CFD9FC] font-thin text-xl">UserName</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
