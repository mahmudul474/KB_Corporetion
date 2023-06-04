import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./SideBar/UserSidebar";

export default function UserDashBord() {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex flex-col lg:flex-row justify-start items-start  ">
        <div className="w-full lg:w-1/3    ">
          <UserSidebar></UserSidebar>
        </div>
        <div className="w-full lg:w-4/6   ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
