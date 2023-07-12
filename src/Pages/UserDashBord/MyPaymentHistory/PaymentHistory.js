import React from "react";
import KoyelItemPaymentHistory from "./KoyelitemPaymentHistory/KoyelItemPaymentHistory";
import ProductPaymentHistory from "./ProductPaymentHistory/ProductPaymentHistory";

export default function PaymentHistory() {
  return (
    <div className="m-auto  mt-8 p-8">
      <div className="h-[400px]">
        <h1 className="text-[#719f18] font-semibold text-lg  capitalize">
          {" "}
          Product
        </h1>
        <ProductPaymentHistory></ProductPaymentHistory>
      </div>
      <div className="h-[400px]">
        <h1 className="text-[#719f18] font-semibold text-lg  capitalize">
          {" "}
          Koyel Item
        </h1>
        <KoyelItemPaymentHistory></KoyelItemPaymentHistory>
      </div>
    </div>
  );
}
