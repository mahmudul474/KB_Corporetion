import React from "react";
import bgImg from "./assetes/slide1.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "../../../TranslationProvider/TranslationProvider";

export default function Slide1() {
  const { translate } = useTranslation();
  return (
    <section
      style={{
        backgroundImage: `url(${bgImg})`
      }}
      className={`relative  z-1 bg-cover bg-center bg-no-repeat`}
    >
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24  max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[710px] lg:items-center lg:px-8">
        <div className="max-w-xl text-left ltr:sm:text-left ">
          <h4 className="text-lg font-semibold text-black">
            {" "}
            {translate("slide1", "h4")}
          </h4>

          <h1 className="text-3xl font-extrabold text-black sm:text-5xl">
            {translate("slide1", "h1")}
          </h1>

          <p className="mt-4 max-w-lg text-black sm:text-xl/relaxed">
            {" "}
            {translate("slide1", "p")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to="/cr"
              className="block w-full rounded  border  btn bg-transparent  px-12 py-3 text-sm font-medium text-black  hover:bg-transparent border-black focus:outline-none focus:ring  sm:w-auto"
            >
              {translate("slide1", "button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
