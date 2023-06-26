import React, { useEffect, useState } from "react";
import UpcommingProductCard from "../../../Shared/UpcommingProductCard/UpcommingProductCard";

export default function KoyelItem() {
  const [KoyelItems, setKoyelItem] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/koyel`)
      .then(res => res.json())
      .then(data => {
        setKoyelItem(data);
      });
  }, []);

  const reversedFeatures = KoyelItems ? [...KoyelItems].reverse() : [];
  return (
    <div>
      {reversedFeatures?.slice(0, 3).map(product => (
        <UpcommingProductCard
          key={product._id}
          data={product}
        ></UpcommingProductCard>
      ))}
    </div>
  );
}
