import React, { useEffect } from "react";
import Hero from "../../Component/HompageComponent/Hero/Hero";
import Featured from "../../Component/HompageComponent/Featured/Featured";
import Subscriptions from "../../Component/HompageComponent/Subscriptions/Subscriptions";
import Upcommings from "../../Component/HompageComponent/Upcomming/Upcommings";
import HowToWork from "../../Component/HompageComponent/HowToWork/HowToWork";
import Review from "../../Component/HompageComponent/Review/Review";
import KoyelItem from "../../Component/HompageComponent/KoyelItem/KoyelItem";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Hero></Hero>

      <Featured></Featured>

      <Subscriptions></Subscriptions>

      <KoyelItem></KoyelItem>

      <HowToWork></HowToWork>

      <Upcommings></Upcommings>

      <Review></Review>
    </div>
  );
}
