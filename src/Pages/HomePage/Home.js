import React, { useEffect } from "react";
import Hero from "../../Component/HompageComponent/Hero/Hero";



import KoyelItem from "../../Component/HompageComponent/KoyelItem/KoyelItem";
import { useLocation } from "react-router-dom";
import ProductInfo from "../../Component/HompageComponent/ProductInfo/ProductInfo";
import Category from "../../Component/HompageComponent/Category/Category";
import CorporateValue from "../../Component/HompageComponent/CorporateValue/CorporateValue";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Hero></Hero>
      <Category></Category>
      <CorporateValue></CorporateValue>
      <ProductInfo></ProductInfo>

      <KoyelItem></KoyelItem>
    </div>
  );
}
