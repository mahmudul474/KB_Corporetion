import React from "react";
import bg from "./corporate.jpg";
export default function CorporateValue() {
  return (
    <div
      className="bg-no-repeat  bg-cover min-h-screen"
      style={{
        backgroundImage: `url(${bg})`
      }}
    >
      <div className="py-[90px] px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className=" flex justify-center items-center  flex-col">
          <h1 className="lg:text-[90px] text-[40px]  text-white font-bold lg:text-black capitalize">
            Corporate Value
          </h1>
          <p className="text-white text-lg   capitalize lg:text-black ">
            Auctions-Kb pursues the corporate value of coexistence .
          </p>
        </div>

        <div className="grid gap-5 my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#"
              class="block rounded-tl-[120px]  max-w-sm p-6 bg-[#4588b4] bg-opacity-50  border    shadow  "
            >
              <h5 class="mb-2 text-[30px] text-white  font-bold tracking-tight text-gray-900  ">
                Innovation Beyond Measure
              </h5>
              <p class="font-normal text-gray-700  text-white ">
                Pioneering the steel auction landscape with cutting-edge
                technology and forward-thinking strategies. Embracing innovation
                to redefine how you connect and trade in the steel industry.
              </p>
            </a>
          </div>

          <div>
            <a
              href="#"
              class="block max-w-sm p-6 bg-[#4588b4] bg-opacity-50  border  rounded-lg shadow  "
            >
              <h5 class="mb-2 text-[30px] text-white  font-bold tracking-tight text-gray-900  ">
                Unparalleled Transparency
              </h5>
              <p class="font-normal text-gray-700  text-white ">
                Transparency is our cornerstone. We ensure an open and fair
                marketplace where every bid and transaction is visible,
                fostering trust and confidence among suppliers and buyers.
              </p>
            </a>
          </div>

          <div>
            <a
              href="#"
              class="block max-w-sm p-6 bg-[#4588b4] bg-opacity-50  border  rounded-lg shadow  "
            >
              <h5 class="mb-2 text-[30px] text-white  font-bold tracking-tight text-gray-900  ">
                Sustainable Partnerships
              </h5>
              <p class="font-normal text-gray-700  text-white ">
                Building lasting relationships is our commitment. We foster
                sustainable partnerships by facilitating mutually beneficial
                deals that fuel the growth and prosperity
              </p>
            </a>
          </div>

          <div>
            <a
              href="#"
              class="block max-w-sm p-6 bg-[#4588b4] bg-opacity-50  border  rounded-br-[120px] shadow  "
            >
              <h5 class="mb-2 text-[30px] text-white  font-bold tracking-tight text-gray-900  ">
                Empowerment Through Data
              </h5>
              <p class="font-normal text-gray-700  text-white ">
                Harnessing the power of data to empower your decisions. Our
                platform provides actionable insights, enabling you to make
                informed choices and optimize your steel sourcing strategies.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
