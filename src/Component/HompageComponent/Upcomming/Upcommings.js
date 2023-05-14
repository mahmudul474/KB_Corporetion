// import React, { useState } from "react";
// import { Tab } from '@headlessui/react'
// import { MdArrowRightAlt } from 'react-icons/md';
// import { RiAuctionFill } from 'react-icons/ri';
// import { FaShoppingCart } from 'react-icons/fa';
// import { HiOutlineBan} from 'react-icons/hi';



// export default function Upcommings() {
//     const [selectedIndex, setSelectedIndex] = useState(0)
//   return (
//     <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
//       <div className="text-center my-5">
//         <h1 className="text-4xl mb-3  font-semibold">Upcoming Auctions</h1>
//         <p className="text-lg text-gray-500">
//           You are welcome to attend and join in the action at any of our
//           upcoming auctions.
//         </p>
//       </div>
//       <div>
//       <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
//       <Tab.List className="w-full border border-black flex justify-between items-center">
//         <Tab  > <span><MdArrowRightAlt></MdArrowRightAlt></span> All </Tab>
//         <Tab><span><RiAuctionFill></RiAuctionFill></span>Live Auction</Tab>
//         <Tab><span><FaShoppingCart></FaShoppingCart></span> Buy Now</Tab>
//         <Tab><span><HiOutlineBan></HiOutlineBan></span> sold Out</Tab>
//       </Tab.List>
//       <Tab.Panels>
//         <Tab.Panel>Content 1</Tab.Panel>
//         <Tab.Panel>Content 2</Tab.Panel>
//         <Tab.Panel>Content 3</Tab.Panel>
//         <Tab.Panel>Content 4</Tab.Panel>
//       </Tab.Panels>
//     </Tab.Group>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { MdArrowRightAlt } from 'react-icons/md';
import { RiAuctionFill } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { HiOutlineBan } from 'react-icons/hi';
import "./Upcoommings.css"
import All from './All/All';
import Live from './Live/Live';
import BuyNow from './BuyNow/BuyNow';
import SoldOut from './SoldOut/SoldOut';
function Upcommings() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="text-center my-5">
        <h1 className="text-4xl mb-3  font-semibold">Upcoming Auctions</h1>
        <p className="text-lg text-gray-500">
          You are welcome to attend and join in the action at any of our
          upcoming auctions.
        </p>
      </div>
      <div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="w-full   shadow-xl px-2 flex-wrap  flex justify-between items-center">
            <Tab className={` flex items-center  text-center ${selectedIndex === 0 ? 'active-tab' : ''} `}  >
              <span className='mr-2'><MdArrowRightAlt /></span> All
            </Tab>
            <Tab className={` flex items-center  text-center ${selectedIndex === 1 ? 'active-tab' : ''} `}>
              <span className='mr-2'><RiAuctionFill /></span> Live Auction
            </Tab>
            <Tab className={` flex items-center  text-center ${selectedIndex === 2 ? 'active-tab' : ''} `}>
              <span className='mr-2'><FaShoppingCart /></span> Buy Now
            </Tab>
            <Tab className={` flex items-center  text-center ${selectedIndex === 3 ? 'active-tab' : ''} `}>
              <span className='mr-2'><HiOutlineBan /></span> Sold Out
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><All></All></Tab.Panel>
            <Tab.Panel><Live></Live></Tab.Panel>
            <Tab.Panel><BuyNow></BuyNow></Tab.Panel>
            <Tab.Panel><SoldOut></SoldOut></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Upcommings;
