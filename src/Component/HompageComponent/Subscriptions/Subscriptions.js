import React from "react";
import bg from "../../../assets/nextgenaretion.png";
import { Link } from "react-router-dom";

export default function Subscriptions() {
  return (
    <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div
        className="bg-no-repeat    rounded-lg bg-center  bg-cover	"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="p-16 flex   items-center  ">
          <div className="text-left">
            <h1 className="text-4xl mb-2 font-semibold text-white">
              Register For Free & Start <br /> Bidding Now!
            </h1>
            <p className="text-lg text-white">
              From cars to diamonds to Still, we have it all
            </p>
            <div className="mt-3">
              <Link to="/register">
                <a
                  role="button"
                  className="btn hover:text-white hover:bg-[#73471b]"
                >
                  Register
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
