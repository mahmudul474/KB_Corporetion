import React from "react";



import KoyelItemWin from "./KoyelItemWin/KoyelItemWin";

export default function WinningBids() {
 

  return (
    <div className="mt-10">
      <h1 className="text-4xl text-black  capitalize  text-left mb-3 pt-10 px-5 font-semibold">
        Win Bids
      </h1>
       
      <div className="mt-5 p-5">
        <h1 className="text-lg font-semibold text-[#719f18] my-6">
           Product Win 
        </h1>
        <KoyelItemWin></KoyelItemWin>
      </div>
    </div>
  );
}
