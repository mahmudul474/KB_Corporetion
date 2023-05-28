 

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
       
<All></All>



      </div>
    </div>
  );
}

export default Upcommings;
