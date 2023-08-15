import React, { useEffect, useState } from "react";
import UpcommingProductCard from "../../../Shared/UpcommingProductCard/UpcommingProductCard";
import { Link } from "react-router-dom";

export default function KoyelItem() {
  const [KoyelItems, setKoyelItem] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/koyel`)
      .then(res => res.json())
      .then(data => {
        setKoyelItem(data);
      });
  }, []);

  const reversedFeatures = KoyelItems ? [...KoyelItems].reverse() : [];
  return (
    <div className="mt-5">
      <div className="text-center my-5">
        <h1 className="flex item-center justify-center text-4xl  font-bold">
          Items
        </h1>
        <span className="w-24  bg-[#719f18] h-[3px] block mb-5 mt-2 m-auto  "></span>
        <p className="text-grey-400 mt-2 text-center ">
          Explore on the world's best & largest Bidding marketplace with our
          beautiful
          <br />
        </p>
      </div>
      <div>
        {" "}
        {reversedFeatures?.slice(0, 3).map(product => (
          <UpcommingProductCard
            key={product._id}
            data={product}
          ></UpcommingProductCard>
        ))}
      </div>
      <div className="my-10">
        <Link to="/items">
          <button className="btn btn-wide transition duration-300 ease-in-out hover:bg-[#73471b] text-white bg-[#719f18] ">
            view more{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
