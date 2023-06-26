import React from 'react'
import Hero from "../../Component/HompageComponent/Hero/Hero";
import Featured from "../../Component/HompageComponent/Featured/Featured";
import Subscriptions from "../../Component/HompageComponent/Subscriptions/Subscriptions";
import Upcommings from "../../Component/HompageComponent/Upcomming/Upcommings";
import HowToWork from "../../Component/HompageComponent/HowToWork/HowToWork";
import Review from "../../Component/HompageComponent/Review/Review";
import KoyelItem from "../../Component/HompageComponent/KoyelItem/KoyelItem";

export default function Home() {
  return (
    <div>
      <div>
        <Hero></Hero>
      </div>
      <div>
        <Featured></Featured>
      </div>
      <div>
        <Subscriptions></Subscriptions>
      </div>
      <div>
        <KoyelItem></KoyelItem>
      </div>
      <div>
        <HowToWork></HowToWork>
      </div>
      <div>
        <Review></Review>
      </div>
    </div>
  );
}
