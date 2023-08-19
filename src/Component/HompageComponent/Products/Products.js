import React from "react";
import bg from "./img/cr.png";

export default function Products() {
  return (
    <div>
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-black my-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-black font-semibold">Products</h1>
          <p className="text-gray-500 text-lg">
            We are giving away our first UI kit for free. It includes over 130
            sections, built with TailwindCSS, for your awesome projects
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2 ">
          <div className="card   bg-green-100 shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card    bg-green-100 shadow-xl">
            <div className="card-body flex flex-col text-left ">
              <h2 className="text-3xl">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>

              <button>Buy Now</button>
            </div>
            <figure>
              <img src={bg} alt="product" />
            </figure>
          </div>
          <div className="card    bg-green-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card    bg-green-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
            </div>
            <figure>
              <img
                src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
