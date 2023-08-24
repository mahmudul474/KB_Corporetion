import React from "react";
import KoyelItemPaymentHistory from "./KoyelitemPaymentHistory/KoyelItemPaymentHistory";
 
export default function PaymentHistory() {
  return (
    <div className="m-auto  mt-8 p-8">
    <h1 className="text-4xl text-black  capitalize  mb-[30px] text-left  pt-10 px-5 font-semibold">
       Payment History
      </h1>
 
      <div className="h-[400px] mt-14">
        <h1 className="text-[#719f18] font-semibold text-lg  capitalize">
          {" "}
           Payment
        </h1>
        <KoyelItemPaymentHistory></KoyelItemPaymentHistory>
      </div>
    </div>
  );
}
