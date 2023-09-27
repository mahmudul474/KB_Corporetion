import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./SideBar/UserSidebar";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";

export default function UserDashBord() {
  const { user } = useContext(AuthContext);
  console.log(user, "this is veryfy user ");

  return (
    <>
      {user?.emailVerified === false ? (
        <div className=" text-center text-red-500 flex justify-center items-center  h-[500px] my-28 ">
          <h1 className=" text-xl capitalize ">
            please check your email & verify your email
          </h1>
        </div>
      ) : (
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
      )}
    </>
  );
}
