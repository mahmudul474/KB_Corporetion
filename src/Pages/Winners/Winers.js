import React, { useEffect, useState } from "react";

export default function Winers() {
  const [winners, setWinnerrs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/winners`)
      .then(res => res.json())
      .then(data => {
        setWinnerrs(data);
      });
  });

  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Winners
          </p>
          <p className="text-base text-gray-700 md:text-lg">
            "During the bidding period, multiple users participated by placing
            their bids for the product. After an active bidding process, one
            user emerged as the highest bidder with the winning bid
          </p>
        </div>
        <div className="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
          {winners?.map(winner => (
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                src={winner?.bidderPhoto}
                alt="Person"
              />
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold">{winner?.bidderName}</p>
                <p className="text-sm text-gray-800">
                  product: {winner?.productName}
                </p>

                <p className="text-sm text-gray-800">
                  winning price: {winner?.amount}$
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
