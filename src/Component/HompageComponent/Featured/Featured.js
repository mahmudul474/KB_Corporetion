import React, { useEffect, useState } from "react";
import featuredBg from "../../../assets/featured-bg-1.jpg";
import actionimg1 from "../../../assets/auction (1).png";
import price from "../../../assets/price (2).png";
import { Link } from "react-router-dom";
import Product from "../../../Shared/ProductCard/Product";
export default function Featured() {
  const [futureds, setFutureds] = useState([]);
 
  console.log(futureds);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setFutureds(data);
      });
  }, []);

  return (
    <div
      className="bg-no-repeat my-10   bg-center  bg-cover	"
      style={{ backgroundImage: `url(${featuredBg})` }}
    >
      <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-left  my-5">
          <h2 className="text-4xl capitalize font-semibold">Featured Items</h2>
          <h3 className="text-lg text-gray-400">
            Start winning cars with comfort
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 ">
          {futureds?.slice(0, 3).map(futured => (
            <Product key={futured._id} data={futured}></Product>
          ))}
        </div>

        <div className="my-10">
          <Link to="/others">
            <button className="m-auto btn bg-transparent border  p-5 rounded-md text-lg  font-semibold capitalize border-green-600">
              {" "}
              View All{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
