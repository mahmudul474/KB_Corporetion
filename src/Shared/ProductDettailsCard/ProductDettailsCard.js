import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import bg from "../../assets/section-bg.png"
import  product from "../../assets/CategoryAssets/03.png"
import Description from "./Description";
import ActionHistory from "./ActionHistory";
import Reviews from "./Reviews";
export default function ProductDettailsCard() {
  const [uploadTime, setUploadTime] = useState(
    new Date("2023-05-18T10:00:00Z")
  );
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    const calculateRemainingTime = () => {
      const currentTime = new Date();
      const timeDifference = uploadTime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setRemainingTime({ hours, minutes, seconds });
    };

    return () => {
      clearInterval(timer);
    };
  }, []);






  

  return (
    <div>
      <section   
      style={{ backgroundImage: `url(${ bg})` }} className="bg-no-repeat relative bg-center  bg-cover     overflow-hidden  py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 h-full lg:h-[500px] ">
                  <img
                    src="https://i.ibb.co/Xz3JW58/image.png"
                    alt=""
                    className="object-cover w-full h-full "
                  />
                </div>
              </div>
            </div>
            <div className="w-full text-left px-4 md:w-1/2 ">
              <div className=" ">
                <div className="mb-4 ">
                  <h2 className="max-w-xl mt-1 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    SPA Steel 
                  </h2>

                  <p className="max-w-md mb-4 text-gray-700 dark:text-gray-400">
                    Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor
                    amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
                    dor amet Lorem ispum dor amet Lorem ispum dor amet
                  </p>
                  <p className="inline-block  mb-1 text-xl font-bold text-green-600  dark:text-green-100 ">
                  Starting bid: <span>600 $</span>
                  </p> 

                  <p  className="mb-1">Current bid:   <span>No Bids</span></p>

                  <div className="flex justify-start flex-col lg:flex-row  text-xl text-left items-start">
                    <h4 className="lg:mr-2">This Auction Ends in:</h4>
                    <h2 className="text-red-500">
                      {" "}
                      {remainingTime.hours.toString().padStart(2, "0")} h :{" "}
                      {remainingTime.minutes.toString().padStart(2, "0")} m :{" "}
                      {remainingTime.seconds.toString().padStart(2, "0")}s
                    </h2>
                  </div>
                </div>

                <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Bid Now
                  </h5>
                  <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
                    Bid Amount : Minimum Bid $20.00
                  </p>
                  <span className="w-16 h-1 bg-green-600 block"></span>

                  <div>
                    <form className="flex justify-between my-5 items-center">
                      <div className="  w-full">
                        <input
                          type="text"
                          id="voice-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="$00:00"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        ></button>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex lg:w-1/3 w-1/2 items-center py-2.5 px-3 lg:px-8 ml-2 text-sm font-medium text-white bg-green-600 rounded-lg border border-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-800"
                      >
                        Place Bid
                      </button>
                    </form>

                    <button
                      type="button"
                      className="  text-center w-full    px-5 py-2.5 text-sm font-medium   text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg--blue700 dark:focus:ring-green-800"
                    >
                      Buy now for
                      <span className="inline-flex items-center justify-center  ml-2 text-xs font-semibold text-white ">
                        2000 $
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 shadow-2xl py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex justify-between   flex-col lg:flex-row">

      <div className="w-full   lg:w-2/3">
       <Tab.Group manual>
          <Tab.List className="flex  justify-start items-center ">
            <Tab  className="border-none  mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">Description </Tab>
            <Tab   className="border-none   mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">Auction history </Tab>
            <Tab   className="border-none  mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">Reviews   </Tab>
             
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><Description></Description></Tab.Panel>
            <Tab.Panel> <ActionHistory></ActionHistory></Tab.Panel>
            <Tab.Panel><Reviews></Reviews></Tab.Panel>
            
          </Tab.Panels>
        </Tab.Group>
       </div>
   
   <div className="w-full   lg:w-1/3">
    <h1>this is sell component </h1>
   </div>
      </div>

     

      </div>
    </div>
  );
}
