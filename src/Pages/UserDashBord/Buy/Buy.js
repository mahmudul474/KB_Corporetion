import React from "react";

import KoyelItembuy from "./KoyelItemBuy/KoyelItembuy";

export default function Buy() {
  return (
    <div className="mt-10">
      <h1 className="text-4xl text-black  capitalize  text-left mb-3 pt-10 px-5 font-semibold">
        Purchase
      </h1>

      <div className="p-5">
        <KoyelItembuy></KoyelItembuy>
      </div>
    </div>
  );
}
