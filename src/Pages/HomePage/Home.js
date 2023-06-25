import React from 'react'
import Hero from '../../Component/HompageComponent/Hero/Hero'
import Category from '../../Component/HompageComponent/Category/Category'
import Featured from '../../Component/HompageComponent/Featured/Featured'
import Subscriptions from '../../Component/HompageComponent/Subscriptions/Subscriptions'
import Upcommings from '../../Component/HompageComponent/Upcomming/Upcommings'
import HowToWork from '../../Component/HompageComponent/HowToWork/HowToWork'
import Review from '../../Component/HompageComponent/Review/Review'
 

export default function Home() {
  return (
    <div>
      <div >
        <Hero></Hero>
      </div>

      <div>
        <Category></Category>
      </div>
      <div>
        <Featured></Featured>
      </div>
      <div>
        <Subscriptions></Subscriptions>
      </div>
      <div>
        <Upcommings></Upcommings>
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
