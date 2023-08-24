import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Event.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function Events() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 60,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
      </Swiper>

      <div>
        <div className="flex justify-center  flex-col my-5 items-center ">
          <h2 className="text-3xl  font-bold capitalize mb-3">New Office Inauguration</h2>
          <p>
            Team SWAPNO shifted to its new office at IDB Bhavan on November 01,
            2022. Mr. Stefan Liller, Resident Representative of UNDP Bangladesh
            along with the Senior Management team and colleagues inaugurated the
            new office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>

          <div className="flex items-center justify-center   from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
            <div className="   aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
              <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                <div>
                  <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                    <div className="font-bold">Jessie Watsica</div>

                    <div className="opacity-60 text-sm ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Distinctio dolores error iure, perferendis sequi totam. Ad
                      aliquam aperiam atque deleniti dolor dolorem enim esse et
                      in, inventore itaque, pariatur reprehenderit.
                    </div>
                  </div>
                </div>
              </div>
              <img
                alt=""
                className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                src="https://images.unsplash.com/photo-1650790362847-3c1dd609d0c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80
"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
