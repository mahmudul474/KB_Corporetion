import React, { useEffect, useState } from "react";
import featuredBg from "../../../assets/featured-bg-1.jpg";
import actionimg1 from "../../../assets/auction (1).png";
import price from "../../../assets/price (2).png";
export default function Featured() {
  const [futureds, setFutureds] = useState([]);

  useEffect(() => {
    fetch("futured.json")
      .then((res) => res.json())
      .then((data) => {
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
          {futureds?.slice(0, 3).map((futured) => (
            <div className="card px-2 bg-base-100 shadow-xl">
              <figure className="  flex justify-center items-center ">
                <img
                  src={futured?.img}
                  alt="Shoes"
                  className="rounded-xl object-cover w-full h-48"
                />
              </figure>
              <div className="card-body py-5 items-center text-left px-3">
                <h2 className="card-title text-xl  capitalize my-3 font-semibold">
                  {futured.title}
                </h2>

                <hr className=""></hr>

                <div className="flex justify-between items-center py-5 ">
                  <div className="flex">
                    <img className="w-10 h-10" alt="action" src={actionimg1} />
                    <div className="ml-2 text-lg font-semibold">
                      <h2 className="text-green-600">Current Bid</h2>
                      <h1>{futured.CurentBid} $</h1>
                    </div>
                  </div>
                  <span className="w-[2px] h-10 bg-green-600"></span>
                  <div className="flex">
                    <img className="w-10 h-10" alt="action" src={price} />
                    <div className="ml-2 text-lg font-semibold">
                      <h2 className="text-red-600">Buy now</h2>
                      <h1>{futured.buyPrice} $</h1>
                    </div>
                  </div>
                </div>

                <hr className=""></hr>

                <div className="flex justify-between text-2xl items-center my-4">
                  <h2 className="text-red-500">0d : 4h : 33m : 40s </h2>
                  <span className="w-[2px] h-6 bg-green-600"></span>
                  <h2 className="text-green-600">{futured.CurentBid} Bids</h2>
                </div>

                <div className="card-actions">
                  <div class="mb-4">
                    <button
                      type="button"
                      className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
                    >
                      Submit A Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-10">
          <button className="m-auto btn bg-transparent border  p-5 rounded-md text-lg  font-semibold capitalize border-green-600">
            {" "}
            View All{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
