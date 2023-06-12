import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function BiddingCloseNoBids() {
  const {
    data: products = [],
    refetch,
    isLoading
  } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/no-bids-end-time`
      );
      const data = await res.json();
      return data;
    }
  });

  return <div>{products.length}</div>;
}
