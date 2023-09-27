import React, { useEffect, useState } from "react";

export default function AdminWiner({ id }) {
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}/winner`)
      .then(res => res.json())
      .then(data => {
        setWinner(data);
      });
  }, []);



  return (
    <div className="flex  items-center">
      <img
        className="w-10 h-10 rounded-full"
        src={winner?.bidderPhoto}
        alt="product img"
      />
      <div className="pl-3">
        <div className="text-base font-semibold">{winner?.bidderName}</div>
        <div className="font-normal text-gray-500">{winner?.bidderEmail}</div>
        <div className="font-normal text-gray-500">Price: {winner?.amount}</div>
      </div>
    </div>
  );
}
