import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function KoyelItemPageLayot() {
  return (
    <div>
      <div className="flex bg-[#719f18] justify-start items-left text-white p-12  text-xl font-semibold">
        <div>
          <h1 className="text-left">Auction Item</h1>
          <p className="text-sm ">
            Discover thrilling auctions and bid on a diverse selection of items
            at our dynamic online platform
          </p>
        </div>
      </div>

      <div className="flex justify-center  items-start flex-col lg:flex-row">
        <div class="bg-white shadow-2xl  h-screen rounded-md w-full lg:w-1/4">
          <h1 class="text-center text-xl my-[20px] mt-[20px]  bg-white py-2 rounded-md border-b-2 cursor-pointer  text-[#719f18]">
            Find Your Favorite Products at Our <br></br> Exciting Auctions!
          </h1>
          <div class="bg-white rounded-md list-none h-full text-center ">
            <Link to="/items">
              <li class="py-3 border-b-2">
                <a href="#" class="list-none  hover:text-[#719f18]">
                  Items
                </a>
              </li>
            </Link>
            <Link to="/items/end-week">
              <li class="py-3 border-b-2">
                <a href="#" class="list-none  hover:text-[#719f18]">
                  This Week End
                </a>
              </li>
            </Link>
            <Link to="/items/this-month">
              <li class="py-3 border-b-2">
                <a href="#" class="list-none  hover:text-[#719f18]">
                  This Month End
                </a>
              </li>
            </Link>
          </div>
        </div>

        <div class=" w-full lg:w-2/3 rounded-md ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
