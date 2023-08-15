import React from "react";
import { Link } from "react-router-dom";

export default function UpcoomingCard({ data }) {
  return (
    <div className="card card-side bg-white shadow-2xl">
      <figure className="lg:w-2/5 md:w-1/3 w-full">
        <img src={data?.mainImage} alt="mainImg" />
      </figure>
      <div className="card-body flex flex-col justify-start items-center">
        <h2 className="text-left">{data?.name}</h2>
        <p className="text-left">{data?.description.slice(0, 20)}</p>
        <p>
          Start Bidding <br /> {data?.startBiddingTime}
        </p>

        <div className="card-actions flex items-end justify-end ">
          <Link to={`/products}`}>
            <button className="btn bg-[#719f18] hover:bg-[#73471b] text-white">
              Watch
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
