import React from "react";
import { MdDashboard } from "react-icons/md";

export default function AdminSaidbar({ isOpen }) {
  return (
    <div className=" flex">
      {/* Large Devices (lg) */}
      <div className="hidden lg:flex lg:w-64 bg-gray-200">
        {/* Drawer content */}
        <div class="min-h-screen flex flex-row bg-gray-100">
          <div class="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
            <div class="flex items-center justify-center h-20 shadow-md">
              <h1 class="text-3xl uppercase text-indigo-500">Logo</h1>
            </div>
            <ul class="flex flex-col py-4">
              <li>
                <p class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <MdDashboard></MdDashboard>
                  </span>
                  <span class="text-sm font-medium">Dashboard</span>
                </p>
              </li>

              <li>
                <p class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <MdDashboard></MdDashboard>
                  </span>
                  <span class="text-sm font-medium">Dashboard</span>
                </p>
              </li>
              <li>
                <p class="flex flex-row items-center pl-4 h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <MdDashboard></MdDashboard>
                  </span>
                  <span class="text-sm font-medium">Dashboard</span>
                </p>
              </li>
              <li>
                <p class="flex flex-row items-center pl-4 h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <MdDashboard></MdDashboard>
                  </span>
                  <span class="text-sm font-medium">Dashboard</span>
                </p>
              </li>

              <li>
                <a
                  href="#"
                  class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                >
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                    <i class="bx bx-log-out"></i>
                  </span>
                  <span class="text-sm font-medium">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Small Devices (sm) */}
      <div
        className={`fixed inset-0 lg:hidden bg-gray-800 bg-opacity-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer content */}
        <div className="p-4 h-full flex items-center">
          <h2 className="text-xl font-bold text-white">Drawer Content</h2>
          {/* Add your drawer content here */}
        </div>
      </div>
    </div>
  );
}
