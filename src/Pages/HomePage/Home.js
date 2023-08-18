import React, { useEffect } from "react";
import Hero from "../../Component/HompageComponent/Hero/Hero";
import Featured from "../../Component/HompageComponent/Featured/Featured";
import Subscriptions from "../../Component/HompageComponent/Subscriptions/Subscriptions";
import Upcommings from "../../Component/HompageComponent/Upcomming/Upcommings";


import KoyelItem from "../../Component/HompageComponent/KoyelItem/KoyelItem";
import { useLocation } from "react-router-dom";
import ProductInfo from "../../Component/HompageComponent/ProductInfo/ProductInfo";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Hero></Hero>
      <ProductInfo></ProductInfo>
      <Featured></Featured>
      <Subscriptions></Subscriptions>
      <KoyelItem></KoyelItem>
      <Upcommings></Upcommings>
    </div>
  );
}
