import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./SideBar/UserSidebar";

export default function UserDashBord() {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-start items-center ">
        <div className="w-full lg:w-5/12 border  border-black">
          <UserSidebar></UserSidebar>
        </div>
        <div className="w-full lg:w-3/6 border-black  border ">
          <h1>col 2</h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
