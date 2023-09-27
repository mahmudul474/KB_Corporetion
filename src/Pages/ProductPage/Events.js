import React, { useRef, useState } from "react";
 
 
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img1 from "./eventImg/img1.jpg";
import img2 from "./eventImg/img2.jpg";
import img3 from "./eventImg/img3.jpg";
import img4 from "./eventImg/img4.jpg";
import img5 from "./eventImg/img5.jpg";
import img6 from "./eventImg/img6.jpg";
import slide1 from "./eventImg/slide1.jpg";
import slide2 from "./eventImg/slide2.jpg";
import slide3 from "./eventImg/slide3.jpg";
import slide4 from "./eventImg/slide4.jpg";
import slide5 from "./eventImg/slide5.jpg";
import slide6 from "./eventImg/slide6.jpg";
 
import slide8 from "./eventImg/slide8.jpg";

export default function Events() {
  return (
    <>
      <>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Autoplay, Pagination,  ]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide1} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide2} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide3} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide4} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide5} />
          </SwiperSlide>
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide6} />
          </SwiperSlide>
          
          <SwiperSlide>
            <img className="h-[400px] w-full object-cover " src={slide8} />
          </SwiperSlide>
        </Swiper>
      </>

      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex justify-center  flex-col my-5 items-center ">
          <h2 className="text-3xl text-black   font-bold capitalize mb-3">
            Unveiling Excellence in Steel: Join Our Exclusive Event
          </h2>
          <p className="text-center text-black  w-[70%]">
            Mark your calendars for an exclusive upcomming steel industry event
            hosted by Auction KB. Dive into a world of innovation, insights, and
            networking opportunities as we bring together experts,
            manufacturers, and enthusiasts. Discover the latest trends,
            technologies, and applications in the steel sector while connecting
            with like-minded individuals. Don't miss this chance to be part of
            an event that celebrates the future of steel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      Steel Symposium 2022: Shaping Tomorrow's World
                    </div>

                    <div className="opacity-60 text-sm ">
                      Our Steel Symposium was a grand success, featuring
                      prominent industry speakers who shared insights on
                      emerging steel trends and technologies. Attendees had the
                      opportunity to engage in panel discussions, workshops, and
                      networking sessions that fostered valuable connections.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img1}
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      InnovateSteel Expo: Unveiling Cutting-Edge Solutions
                    </div>

                    <div className="opacity-60 text-sm ">
                      The InnovateSteel Expo showcased the latest innovations in
                      steel manufacturing, fabrication, and application. From
                      advanced coatings to sustainable practices, participants
                      explored the forefront of steel technology while
                      experiencing hands-on demonstrations.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img2}
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      Steel Industry Networking Gala: Connecting Minds, Forging
                      Futures
                    </div>

                    <div className="opacity-60 text-sm ">
                      The Steel Industry Networking Gala was an evening of
                      elegance and collaboration. Attendees enjoyed networking
                      in a vibrant atmosphere, exchanging ideas, and forging
                      partnerships that contribute to the growth of the steel
                      sector.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img3}
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      SteelCraft Showcase: Artistry in Steel Design
                    </div>

                    <div className="opacity-60 text-sm ">
                      Our SteelCraft Showcase celebrated the artistic side of
                      steel, featuring stunning creations from talented
                      designers and artists. Attendees marveled at the
                      versatility of steel, which was transformed into intricate
                      sculptures, functional pieces, and architectural marvels.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img4}
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      Sustainability in Steel Summit: Building a Greener Future
                    </div>

                    <div className="opacity-60 text-sm ">
                      The Sustainability in Steel Summit was dedicated to
                      exploring environmentally conscious practices within the
                      steel industry. Thought leaders and sustainability experts
                      discussed strategies for reducing the carbon footprint and
                      enhancing eco-friendly approaches.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img5}
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">
                      Networking and Collaboration: Forging New Partnerships
                    </div>

                    <div className="opacity-60 text-sm ">
                      Beyond the awards, the event provided a platform for
                      networking and collaboration. Attendees engaged in
                      meaningful discussions, shared insights, and forged
                      partnerships that fostered growth and advancement in the
                      steel sector.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src={img6}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
