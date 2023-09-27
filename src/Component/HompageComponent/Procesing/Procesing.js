import React from "react";
import bg from "./bg.jpg";

export default function Procesing() {
  return (
    <div
      className=" h-[500px] bg-no-repeat bg-contain bg-center "
      style={{
        backgroundImage: `url(${bg})`
      }}
    ></div>
  );
}
