import React, { useEffect, useState } from "react";
import featuredBg from "../../../assets/featured-bg-1.jpg";
import { Link } from "react-router-dom";
import Product from "../../../Shared/ProductCard/Product";

export default function Featured() {
  const [futureds, setFutureds] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setFutureds(data);
      });
  }, []);

  const reversedFeatures = futureds ? [...futureds].reverse() : [];

  return (
    <div
      className="bg-no-repeat my-10   bg-center  bg-cover	"
      style={{ backgroundImage: `url(${featuredBg})` }}
    >
      <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-center my-5">
          <h1 className="flex item-center justify-center text-4xl  font-bold">
            Live Auction
          </h1>
          <span className="w-24 bg-[#719f18] h-[3px] block mb-5 m-auto  "></span>
          <p className="text-grey-400 mt-2 text-center ">
            Explore on the world's best & largest Bidding marketplace with our
            beautiful
            <br />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 m-auto md:grid-cols-2 gap-5 ">
          {reversedFeatures.slice(0, 3).map(futured => (
            <Product key={futured._id} data={futured}></Product>
          ))}
        </div>

        <div className="my-10">
          <Link to="/others">
            <button className="btn btn-wide transition duration-300 ease-in-out hover:bg-[#73471b] text-white bg-[#719f18] ">
              view more{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
