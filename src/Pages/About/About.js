import React from "react";
import img from "./assets/img.jpg";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.png";
import ban from "./assets/ban.jpg";
import mapImg from "./assets/map.png";
import commitImg from "./assets/Commitment.png"
import compayarImg from "./assets/Comprehensive.png"
import diverImg from "./assets/Diver.png"
import reliImg from "./assets/Reli.png"
import tridloImg from "./assets/Tailored.png"
import trusImg from "./assets/Trus.png"
import { useTranslation } from "../../Component/TranslationProvider/TranslationProvider";

export default function About() {
  const { translate } = useTranslation();
  const mapStyles = {
    width: "100%",
    height: "400px"
  };
  return (
    <div>
      <section className="flex items-center py-20 bg-gray-100 font-poppins ">
        <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-6 md:px-6">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
              <div className="flex flex-wrap">
                <div className="w-full px-4 md:w-1/2">
                  <img
                    src={img}
                    alt=""
                    className="object-cover w-full mb-6 rounded-lg h-80"
                  />
                  <img
                    src={img1}
                    alt=""
                    className="object-cover w-full rounded-lg h-80"
                  />
                </div>
                <div className="w-full px-4 md:w-1/2 xl:mt-11">
                  <img
                    src={img2}
                    alt=""
                    className="object-cover w-full mb-6 rounded-lg h-80"
                  />
                  <img
                    src={img3}
                    alt=""
                    className="object-cover w-full rounded-lg h-80"
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 mb-10 xl:w-1/2 lg:mb-8">
              <h2 className="mt-2 mb-4 text-2xl font-bold  text-left   text-black ">
                {translate("company", "title")}
              </h2>
              <p className="mb-4 className= leading-7 text-gray-500 dark:text-gray-black  text-left">
                {translate("company", "description")}
              </p>
              <ul className="mb-10 list-outside hover:list-inside">
                <li className="flex items-center mb-4 className= text-black  ">
                  {translate("company", "1")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "2")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "3")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "4")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "5")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "6")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "7")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "8")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "9")}
                </li>
                <li className="flex items-center mb-4 className= text-black  dark:text-gray-400">
                  {translate("company", "10")}
                </li>
              </ul>
              <a
                href="#"
                download=""
                className="px-4 py-2 text-gray-100 bg-[#719f18] rounded-md   hover:bg-[#719f18]"
              >
                {translate("company", "download")}
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <div className=" my-5 flex flex-col justify-center my-4 items-center  ">
          <h1 className="text-3xl capitalize font-bold  text-black  ">
            {" "}
            {translate("why", "title")}
          </h1>

          <p className="text-center  text-gray-700 my-4 ">
            {translate("why", "description")}
          </p>
        </div>
        <div className="-mx-4 flex flex-wrap p-8">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={trusImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title1")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk1")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={reliImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title2")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk2")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={tridloImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title3")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk3")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={diverImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title4")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk4")}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={compayarImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title5")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk5")}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3 bg-white">
            <div className="mb-9 rounded-xl py-8 px-7 shadow-md transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9">
              <div className="mx-auto mb-7 inline-block">
                <img className="h-[150px] object-contain" src={commitImg} />
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                  {translate("why", "title6")}
                </h3>
                <p className="className= font-medium text-body-color">
                  {translate("why", "desk6")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl capitalize  font-semibold  text-black my-4 ">
          {translate("why", "offics")}
        </h1>

        <div className=" px-4 py-5  flex  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8flex justify-center items-center flex-col  lg:flex-row ">
          <div className="w-full">
            <div className="w-[400px] h-[300px]">
              <img className="w-full  h-full object-cover" src={ban} />
            </div>
            <div className=" felx justify-start items-start text-left mt-5 text-black">
              <h4>KB CORPORATION</h4>
              <p>{translate("why", "email")}</p>
              <p> {translate("why", "cellphone")}</p>
              <p> {translate("why", "Address")}</p>
            </div>
          </div>
          <div className="w-full">
            <img className="w-full  h-full object-cover" src={mapImg} />
          </div>
        </div>
      </div>
    </div>
  );
}
