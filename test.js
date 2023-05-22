import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error("Error fetching products", error);
      });
  }, []);

  const calculateRemainingTime = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    if (currentTime > endTimeValue) {
      return "Bidding Ended";
    }

    const remainingTime = endTimeValue - currentTime;

    // Convert remaining time to hours, minutes, and seconds
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  };

  const isBiddingStartSoon = startTime => {
    const currentTime = new Date().getTime();
    const startTimeValue = new Date(startTime).getTime();

    return currentTime < startTimeValue;
  };

  const isBiddingEnd = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    return currentTime > endTimeValue;
  };

  const formatDateTime = dateTimeString => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div>
      <h1>Product Listing</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.productName}</h2>
          <p>About: {product.about}</p>
          <p>Start Bidding Price: {product.startBiddingPrice}</p>
          <p>Buy Now Price: {product.buyNowPrice}</p>
          <p>Minimum Bid: {product.minimumBid}</p>
          <p>Start Bidding Time: {formatDateTime(product.startBiddingTime)}</p>
          <p>End Bidding Time: {formatDateTime(product.endBiddingTime)}</p>
          {isBiddingStartSoon(product.startBiddingTime) &&
          !isBiddingEnd(product.endBiddingTime) ? (
            <p>Start Bidding Soon</p>
          ) : isBiddingEnd(product.endBiddingTime) ? (
            <p>Bidding Ended</p>
          ) : (
            <p>
              Remaining Time: {calculateRemainingTime(product.endBiddingTime)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
