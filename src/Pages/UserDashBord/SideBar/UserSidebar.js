import React, { useContext, useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { GiThorHammer } from "react-icons/gi";
import { FaRegSmileWink } from "react-icons/fa";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import { AiFillEdit } from "react-icons/ai";
import EditProfilePopup from "../../../Shared/UserProfileEditPopUp/EditProfilePopup";
import { MdSell } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function UserSidebar() {
  const { currentUser, logOut } = useContext(AuthContext);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleLogOut = () => {
    logOut().then(() => {
      window.location.reload(true);
      toast.error("user Log-Out successfully");
    });
  };

  return (
    <div>
      <div>{showPopup && <EditProfilePopup onClose={closePopup} />}</div>

      <div className="h-full text-black  p-3 space-y-2 text-2xl  bg-white shadow-2xl rounded rounded-lg">
        <div className="flex justify-end items-end">
          <span
            onClick={openPopup}
            className="shadow-2xl bg-emerald-100 cursor-pointer text-black p-3 rounded-lg"
          >
            <AiFillEdit></AiFillEdit>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 space-x-4">
          <img
            src={currentUser?.userPhoto}
            alt=""
            className="w-20 h-20 rounded-full "
          />

          <div className="tex-center text-black">
            <h2 className=" font-semibold  ">{currentUser?.name}</h2>
            <span className="text-sm">{currentUser?.email}</span>
          </div>

          <div className="text-left capitalize flex flex-col ">
            {currentUser?.role && (
              <span className="text-sm"> Role: {currentUser?.role}</span>
            )}
            {currentUser?.message && (
              <span className="text-sm   text-red-500">
                {" "}
                Message: {currentUser?.message.message}
              </span>
            )}
          </div>
        </div>
        <h1></h1>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 px-5  text-lg  font-semibold">
            <Link to="/my-dashboard">
              <li className=" bg-white cursor-pointer  text-black ">
                <span className="flex items-center p-2 space-x-3 rounded-md">
                  <GrUserSettings></GrUserSettings>

                  <span className="text-black">Personal Details</span>
                </span>
              </li>
            </Link>

            {currentUser?.role === "bidder" && (
              <>
                <Link to="/my-dashboard/request/seller">
                  <li className=" bg-white  cursor-pointer  text-black ">
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <MdSell></MdSell>
                      <span className="text-black"> Become a Seller</span>
                    </span>
                  </li>
                </Link>

                <Link to="/my-dashboard/my-bids">
                  <li className=" bg-white  cursor-pointer text-black ">
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <GiThorHammer></GiThorHammer>
                      <span>My Bids</span>
                    </span>
                  </li>
                </Link>

                <Link to="/my-dashboard/win-bids">
                  <li className=" cursor-pointer bg-white  text-black ">
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <FaRegSmileWink></FaRegSmileWink>
                      <span>Winning Bids</span>
                    </span>
                  </li>
                </Link>

                <Link to="/my-dashboard/buy">
                  <li className=" cursor-pointer bg-white  text-black ">
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <AiOutlineMoneyCollect></AiOutlineMoneyCollect>
                      <span>Buy</span>
                    </span>
                  </li>
                </Link>
                <Link to="/my-dashboard/payment-history">
                  <li className=" cursor-pointer bg-white  text-black ">
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <AiOutlineMoneyCollect></AiOutlineMoneyCollect>
                      <span>Payment History</span>
                    </span>
                  </li>
                </Link>
              </>
            )}

            <hr className="my-5"></hr>
            <li
              onClick={handleLogOut}
              className="cursor-pointer  bg-white   text-black "
            >
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
