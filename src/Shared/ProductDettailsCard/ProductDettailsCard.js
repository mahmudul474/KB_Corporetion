import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import bg from "../../assets/section-bg.png";
import product from "../../assets/CategoryAssets/03.png";
import Description from "./Description";
import ActionHistory from "./ActionHistory";
import Reviews from "./Reviews";
import WinBids from "../WinBids/WinBids";
import { useLoaderData } from "react-router-dom";
import SubImgSlider from "./SubImgSlider";

export default function ProductDettailsCard() {
  const data = useLoaderData();
  const [subimageUrl, setSubImgUrl] = useState(null);

  const handleSubimgShow = subimgUrl => {
    setSubImgUrl(subimgUrl);
  };

  const calculateRemainingTime = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    if (currentTime > endTimeValue) {
      return "Bidding Close";
    }

    const remainingTime = endTimeValue - currentTime;

    // Convert remaining time to days, hours, minutes, and seconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(data.endBiddingTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(data.endBiddingTime));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data.endBiddingTime]);

  const isBiddingStartSoon = startTime => {
    const currentTime = new Date().getTime();
    const startTimeValue = new Date(startTime).getTime();

    return currentTime < startTimeValue;
  };

  const isBiddingEnd = endTime => {
    const currentTime = new Date().getTime();
    const endTimeValue = new Date(endTime).getTime();

    return currentTime > endTimeValue;
  };

  const formatDateTime = dateTimeString => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };

    const dateTime = new Date(dateTimeString).toLocaleString("en-US", options);
    const [date, time] = dateTime.split(", ");

    const formattedDate = date.replace(/\//g, "-");
    const formattedTime = time.toLowerCase();

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <section className="bg-no-repeat relative bg-center  bg-cover     overflow-hidden  py-11 font-poppins  capitalize">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 h-full  ">
                  {subimageUrl ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/sub-images/${subimageUrl}`}
                      alt=""
                      className="  w-full h-[400px] object-contain "
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/main-images/${data?.mainImage}`}
                      alt=""
                      className="h-[400px] object-contain w-full   "
                    />
                  )}
                </div>
                <div>
                  <SubImgSlider
                    handleSubimgShow={handleSubimgShow}
                    images={data.subImages}
                  ></SubImgSlider>
                </div>
              </div>
            </div>
            <div className="w-full text-left px-4 md:w-1/2 ">
              <div className=" ">
                <div className="mb-4 ">
                  <h2 className="max-w-xl mt-1 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {data.name}
                  </h2>

                  <p className="max-w-md mb-4 text-gray-700 dark:text-gray-400">
                    {data?.description}
                  </p>
                  <p className="inline-block  mb-1 text-xl font-bold text-green-600  dark:text-green-100 ">
                    Starting bid: <span>{data?.startBiddingPrice} $</span>
                  </p>

                  <p className="mb-1">
                    Current bid: <span>No Bids</span>
                  </p>

                  <div className="flex justify-start flex-col lg:flex-row  text-xl text-left items-start">
                    <h4 className="lg:mr-2">This Auction Ends in:</h4>
                    <h2 className="text-red-500">{remainingTime}</h2>
                  </div>
                </div>

                <div className="flex my-2 flex-col text-lg  font-semibold  justify-start items-start">
                  <p className="flex flex-col  text-green-500  items-center ">
                    Start Bidding Time:
                    {formatDateTime(data.startBiddingTime)}
                  </p>
                  <p className="flex text-red-700 flex-col items-center ">
                    End Bidding Time:
                    {formatDateTime(data.endBiddingTime)}
                  </p>
                </div>

                <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Bid Now
                  </h5>
                  <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
                    Minimum Bid: {data?.minimumBid} $
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

                    <div className="flex  items-center lg:flex-row flex-col  justify-between ">
                      {" "}
                      <a
                        className=" mx-3 my-2 text-center w-full  "
                        target="_blank"
                        href={`${process.env.REACT_APP_API_URL}/uploads/pdf-files/${data.pdfFile}`}
                        download="product-description"
                      >
                        <button
                          type="button"
                          className="  px-5 py-2.5 text-sm font-medium   text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg--blue700 dark:focus:ring-green-800"
                        >
                          Download PDF
                        </button>
                      </a>
                      <button
                        type="button"
                        className=" mx-3 my-2 text-center w-full    px-5 py-2.5 text-sm font-medium   text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg--blue700 dark:focus:ring-green-800"
                      >
                        Buy now for
                        <span className="inline-flex items-center justify-center  ml-2 text-xs font-semibold text-white ">
                          {data?.buyNowPrice} $
                        </span>
                      </button>
                    </div>
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
                <Tab className="border-none  mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">
                  Description{" "}
                </Tab>
                <Tab className="border-none   mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">
                  Auction history{" "}
                </Tab>
                <Tab className="border-none  mr-5 shadow-2xl p-5 rounded-lg  font-bold  hover:bg-green-600 transition duration-500 ease-in-out hover:text-white">
                  Reviews{" "}
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Description></Description>
                </Tab.Panel>
                <Tab.Panel>
                  {" "}
                  <ActionHistory></ActionHistory>
                </Tab.Panel>
                <Tab.Panel>
                  <Reviews></Reviews>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="w-full   lg:w-1/3">
            <div className="shadow-2xl px-5">
              <WinBids></WinBids>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// import ActionHistory from "./ActionHistory";
// import SubImgSlider from "./SubImgSlider";

// const ProductDettailsCard = ({ data }) => {
//   return (
//     <section class="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden">
//       <div class="container px-4 mx-auto">
//         <div class="flex flex-wrap -mx-4">
//           <div class="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
//             <img src="https://i.ibb.co/p4TyXBT/photo-1627828982792-831c0aa9f585-ixlib-rb-4-0.jpg" />
//             <div>
//               <SubImgSlider images={data.subImages}></SubImgSlider>
//             </div>
//           </div>
//           <div class="w-full lg:w-1/2 px-4">
//             <div class="max-w-md mb-6">
//               <h2 class="mt-6 mb-4 text-xl md:text-xl lg:text-xl font-heading font-medium">
//                 {data.name}
//               </h2>
//               <p class="flex items-center mb-6">
//                 <span class="mr-2 text-sm text-blue-500 font-medium">$</span>
//                 <span class="text-3xl text-blue-500 font-medium">44.90</span>
//               </p>
//               <p class="text-lg text-gray-400 capitalize">
//                 {data?.description}
//               </p>
//             </div>
//             <div class="flex mb-6 items-center">
//               <div class="inline-flex mr-4">
//                 <button class="mr-1">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewbox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
//                       fill="#C1C9D3"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button class="mr-1">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewbox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
//                       fill="#C1C9D3"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button class="mr-1">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewbox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
//                       fill="#C1C9D3"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button class="mr-1">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewbox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
//                       fill="#C1C9D3"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewbox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
//                       fill="#C1C9D3"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//               <span class="text-md text-gray-400">4.59</span>
//             </div>
//             <div class="mb-6">
//               <h4 class="mb-3 font-heading font-medium">
//                 <span>Color:</span>
//                 <span class="text-gray-400">Silver</span>
//               </h4>
//               <button class="inline-flex items-center justify-center p-1 rounded-full border border-gray-300">
//                 <div class="w-6 h-6 rounded-full bg-white"></div>
//               </button>
//               <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
//                 <div class="w-6 h-6 rounded-full bg-orange-800"></div>
//               </button>
//               <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
//                 <div class="w-6 h-6 rounded-full bg-blue-900"></div>
//               </button>
//               <button class="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
//                 <div class="w-6 h-6 rounded-full bg-yellow-500"></div>
//               </button>
//             </div>
//             <div class="mb-10">
//               <h4 class="mb-3 font-heading font-medium">Qty:</h4>
//               <input
//                 class="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
//                 type="text"
//                 placeholder="1"
//               />
//             </div>
//             <div class="flex flex-wrap -mx-2 mb-12">
//               <div class="w-full md:w-2/3 px-2 mb-2 md:mb-0">
//                 <a
//                   class="block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
//                   href="#"
//                 >
//                   Add to bag
//                 </a>
//               </div>
//               <div class="w-full md:w-1/3 px-2">
//                 <a
//                   class="flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
//                   href="#"
//                 >
//                   <span class="mr-2">Wishlist</span>
//                   <svg
//                     width="23"
//                     height="22"
//                     viewbox="0 0 23 22"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M11.3235 20.1324L2.52488 10.8515C1.75232 10.0706 1.24237 9.06367 1.06728 7.97339C0.8922 6.88311 1.06086 5.76477 1.54936 4.7768V4.7768C1.91837 4.03089 2.45739 3.3843 3.12201 2.89033C3.78663 2.39635 4.55781 2.06911 5.37203 1.93558C6.18626 1.80205 7.0202 1.86605 7.80517 2.1223C8.59013 2.37855 9.30364 2.81972 9.88691 3.40946L11.3235 4.86204L12.7601 3.40946C13.3434 2.81972 14.0569 2.37855 14.8419 2.1223C15.6269 1.86605 16.4608 1.80205 17.275 1.93558C18.0892 2.06911 18.8604 2.39635 19.525 2.89033C20.1897 3.3843 20.7287 4.03089 21.0977 4.7768V4.7768C21.5862 5.76477 21.7549 6.88311 21.5798 7.97339C21.4047 9.06367 20.8947 10.0706 20.1222 10.8515L11.3235 20.1324Z"
//                       stroke="black"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     ></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>
//             <div>
//               <h4 class="mb-6 font-heading font-medium">More information</h4>
//               <button class="flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
//                 <h3 class="text-lg font-heading font-medium">
//                   Shipping &amp; returns
//                 </h3>
//                 <span>
//                   <svg
//                     width="12"
//                     height="8"
//                     viewbox="0 0 12 8"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
//                       fill="black"
//                     ></path>
//                   </svg>
//                 </span>
//               </button>
//               <button class="flex w-full pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
//                 <h3 class="text-lg font-heading font-medium">
//                   Product details
//                 </h3>
//                 <span>
//                   <svg
//                     width="12"
//                     height="8"
//                     viewbox="0 0 12 8"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
//                       fill="black"
//                     ></path>
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDettailsCard;
