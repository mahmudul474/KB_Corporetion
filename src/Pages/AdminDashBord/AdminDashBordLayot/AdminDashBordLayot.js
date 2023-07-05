import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import AdminSaidbar from "../AdminSaidbar/AdminSaidbar";

export default function AdminDashBordLayot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="">
        <AdminNav toggleDrawer={toggleDrawer}></AdminNav>
      </div>
      <div className="px-4  mx-auto  w-full   md:px-24 lg:px-8">
        <div className="flex  justify-start items-start flex-row">
          <div className=" ">
            <AdminSaidbar
              toggleDrawer={toggleDrawer}
              isOpen={isOpen}
            ></AdminSaidbar>
          </div>
          <div className="w-full p-10 ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
