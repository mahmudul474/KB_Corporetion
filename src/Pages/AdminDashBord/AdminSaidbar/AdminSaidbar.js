import React from "react";
import { MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminSaidbar({ isOpen, toggleDrawer }) {
  const navItem = (
    <>
      <Link to="/admin-dashboard">
        <li className="w-52">
          <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black  ">
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-white ">
              <MdDashboard></MdDashboard>
            </span>
            <span className="text-sm font-medium text-white">Dashboard</span>
          </p>
        </li>
      </Link>

      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg text-gray-400">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Products</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/products">
            <li className="">
              <p className="flex flex-row  items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium">Products</span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/products/bidding-close-with-bid">
            <li>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium">Bid close </span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/products/bidding-close/no-bid">
            <li>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium">No bids</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Items</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/products/koyel-item">
            <li className="">
              <p className="flex flex-row  items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium">Items</span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/koyel-item/bidding-close-with-bid">
            <li>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium"> Bid close </span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/koyel-item/bidding-close-with-bid">
            <li>
              <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                </span>
                <span className="text-sm font-medium">No bids create</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">
                Uploads Product
              </span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/productUpload">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Upload Product</span>
              </p>
            </li>
          </Link>

          <Link to="/admin-dashboard/excel-to-productUpload">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Upload Item</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Users</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/users">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Users</span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/users/seller-request">
            <li className="">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Seller Request</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Orders</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/orders">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Orders</span>
              </p>
            </li>
          </Link>
          <Link to="/admin-dashboard/orders/koyel-item">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">koyel-Orders</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Payments</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/payments">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">Payments</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0}>
          <li className="w-full m-auto text-center text-white">
            <p className="flex flex-row items-center  text-white  cursor-pointer text-lg h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800">
              <span className="inline-flex items-center  text-white justify-center h-12 w-12 text-lg ">
                <BiChevronDown></BiChevronDown>
              </span>
              <span className="text-sm font-medium  text-white">Winners</span>
            </p>
          </li>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-box w-52"
        >
          <Link to="/admin-dashboard/winners">
            <li className="w-52">
              <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-black hover:text-gray-800">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                  <TbUpload></TbUpload>
                </span>
                <span className="text-sm font-medium">winners</span>
              </p>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );

  return (
    <div className=" bg-[#719f18] lg:shadow-2xl lg:px-10 lg:mx-5  ">
      {/* Large Devices (lg) */}
      <div className=" lg:flex  hidden lg:w-1/4   rounded-xl   ">
        {/* Drawer content */}
        <div className="h-screen flex flex-row   ">
          <div className="flex flex-col   rounded-r-3xl overflow-hidden">
            <ul className="flex flex-col py-4">{navItem}</ul>
          </div>
        </div>
      </div>

      {/* Small Devices (sm) */}
      <div
        className={`fixed inset-0 lg:hidden w-64   z-50 bg-[#719f18]  transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer content */}
        <div className="p-4 h-full   flex items-center">
          <ul onClick={toggleDrawer} className="flex flex-col py-4">
            {navItem}
          </ul>
          {/* Add your drawer content here */}
        </div>
      </div>
    </div>
  );
}
