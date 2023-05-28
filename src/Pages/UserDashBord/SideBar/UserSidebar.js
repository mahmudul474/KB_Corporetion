import React, { useContext } from "react";
import { GrUserSettings } from "react-icons/gr";
import { GiThorHammer } from "react-icons/gi";
import { FaRegSmileWink } from "react-icons/fa";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";

export default function UserSidebar() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div>
      <div className="h-full p-3 space-y-2 text-2xl bg-slate-100 rounded rounded-lg">
        <div className="flex flex-col items-center justify-center p-2 space-x-4">
          <img
            src="https://i.ibb.co/6vyTQm5/image.png"
            alt=""
            className="w-20 h-20 rounded-full dark:bg-gray-500"
          />
          <div className="tex-center">
            <h2 className=" font-semibold">{currentUser?.name}</h2>
            <span className="text-sm">{currentUser?.email}</span>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 px-5  text-lg  font-semibold">
            <Link to="/my-dashboard">
              <li className="dark:bg-gray-800  dark:text-gray-50">
                <span className="flex items-center p-2 space-x-3 rounded-md">
                  <GrUserSettings></GrUserSettings>

                  <span>Personal Details</span>
                </span>
              </li>
            </Link>

            <Link to="/my-dashboard/my-bids">
              <li className="dark:bg-gray-800  dark:text-gray-50">
                <span className="flex items-center p-2 space-x-3 rounded-md">
                  <GiThorHammer></GiThorHammer>
                  <span>My Bids</span>
                </span>
              </li>
            </Link>

            <Link to="/my-dashboard/win-bids">
              <li className="dark:bg-gray-800  dark:text-gray-50">
                <span className="flex items-center p-2 space-x-3 rounded-md">
                  <FaRegSmileWink></FaRegSmileWink>
                  <span>Winning Bids</span>
                </span>
              </li>
            </Link>

            <Link to="/my-dashboard/buy">
              <li className="dark:bg-gray-800  dark:text-gray-50">
                <span className="flex items-center p-2 space-x-3 rounded-md">
                  <AiOutlineMoneyCollect></AiOutlineMoneyCollect>
                  <span>Buy</span>
                </span>
              </li>
            </Link>
            <hr className="my-5"></hr>
            <li className="dark:bg-gray-800  dark:text-gray-50">
              <span className="flex items-center p-2 space-x-3 rounded-md">
                <span className="text-red-600"> Sing-out</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
