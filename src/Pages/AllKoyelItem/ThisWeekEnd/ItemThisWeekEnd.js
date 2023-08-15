import React, { useEffect, useState } from "react";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";
import UpcommingProductCard from "../../../Shared/UpcommingProductCard/UpcommingProductCard";

export default function ItemThisWeekEnd() {
  const [isloading, setIsLoading] = useState(false);
  const [koyelItems, setKoyelItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/item/bidding-end-week`)
      .then(res => res.json())
      .then(data => {
        setKoyelItems(data);
        setIsLoading(false);
      });
  }, []);

  if (isloading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div>
      <h1 className="text-[#719f18] my-6 text-xl text-left font-semibold  capitalize ">
        This Month End Bidding
      </h1>

      <div>
        {[...koyelItems]?.reverse().map(item => (
          <UpcommingProductCard
            key={item?._id}
            data={item}
          ></UpcommingProductCard>
        ))}
      </div>
    </div>
  );
}
