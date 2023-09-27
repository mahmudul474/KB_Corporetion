import React, { useEffect } from "react";
import Hero from "../../Component/HompageComponent/Hero/Hero";
import { useLocation } from "react-router-dom";
import Category from "../../Component/HompageComponent/Category/Category";
import Procesing from "../../Component/HompageComponent/Procesing/Procesing";


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
