import React, { useEffect, useState } from "react";
import LoadingSpiner from "../../Shared/LoadingSpiner/LoadingSpiner";
import UpcommingProductCard from "../../Shared/UpcommingProductCard/UpcommingProductCard";

export default function AllkoyelItem() {
  const [koyelItems, setKoyelItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/products/koyel`)
      .then(res => res.json())
      .then(data => {
        setKoyelItems(data);
        setIsLoading();
      });
  }, []);

  if (isloading) {
    return <LoadingSpiner></LoadingSpiner>;
  }

  return (
    <div>
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
