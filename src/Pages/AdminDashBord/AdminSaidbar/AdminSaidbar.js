import React from "react";
import { MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function AdminSaidbar({ isOpen }) {
  return (
    <div className=" lg:shadow-2xl lg:px-10 lg:mx-5  ">
      {/* Large Devices (lg) */}
      <div className=" lg:flex  hidden lg:w-1/4   rounded-xl   ">
        {/* Drawer content */}
        <div className="min-h-screen flex flex-row   ">
          <div className="flex flex-col   rounded-r-3xl overflow-hidden">
            <ul className="flex flex-col py-4">
              <Link to="/admin-dashboard">
                <li className="w-52">
                  <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <MdDashboard></MdDashboard>
                    </span>
                    <span className="text-sm font-medium">Dashboard</span>
                  </p>
                </li>
              </Link>

              <Link to="/admin-dashboard/products">
                <li className="w-52">
                  <p className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
                    </span>
                    <span className="text-sm font-medium">Products</span>
                  </p>
                </li>
              </Link>

              <Link to="/admin-dashboard/productUpload">
                <li className="w-52">
                  <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <TbUpload></TbUpload>
                    </span>
                    <span className="text-sm font-medium">Upload Product</span>
                  </p>
                </li>
              </Link>
              <Link to="/admin-dashboard/users">
                <li className="w-52">
                  <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <TbUpload></TbUpload>
                    </span>
                    <span className="text-sm font-medium">Users</span>
                  </p>
                </li>
              </Link>
              <Link to="/admin-dashboard/users/seller-request">
                <li className="">
                  <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <TbUpload></TbUpload>
                    </span>
                    <span className="text-sm font-medium">Seller Request</span>
                  </p>
                </li>
              </Link>

              <Link to="/admin-dashboard/orders">
                <li className="w-52">
                  <p className="flex flex-row items-center cursor-pointer   h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <TbUpload></TbUpload>
                    </span>
                    <span className="text-sm font-medium">Orders</span>
                  </p>
                </li>
              </Link>

              <li className="w-52">
                <a
                  href="#"
                  className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i className="bx bx-log-out"></i>
                  </span>
                  <span className="text-sm font-medium">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Small Devices (sm) */}
      <div
        className={`fixed inset-0 lg:hidden w-64   z-50 bg-gray-800   transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer content */}
        <div className="p-4 h-full   flex items-center">
          <h2 className="text-xl font-bold text-white">Drawer Content</h2>
          {/* Add your drawer content here */}
        </div>
      </div>
    </div>
  );
}
