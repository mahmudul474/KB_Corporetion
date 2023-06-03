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
      <AdminNav toggleDrawer={toggleDrawer}></AdminNav>
      <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex  justify-start items-start flex-row">
          <div className=" lg:block lg:w-1/3">
            <AdminSaidbar isOpen={isOpen}></AdminSaidbar>
          </div>
          <div className="w-full lg:w-2/3">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
