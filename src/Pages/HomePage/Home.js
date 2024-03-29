import React, { useEffect } from "react";
import Hero from "../../Component/HompageComponent/Hero/Hero";
import { useLocation } from "react-router-dom";
import ProductInfo from "../../Component/HompageComponent/ProductInfo/ProductInfo";
import Category from "../../Component/HompageComponent/Category/Category";
import CorporateValue from "../../Component/HompageComponent/CorporateValue/CorporateValue";
import Services from "../../Component/HompageComponent/Services/Services";
import Products from "../../Component/HompageComponent/Products/Products";
import Procesing from "../../Component/HompageComponent/Procesing/Procesing";
import LanguageSwitcher from "../../Component/TranslationProvider/LanguageSwitcher";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Hero></Hero>
      <Category></Category>

      <Procesing></Procesing>
    </div>
  );
}
