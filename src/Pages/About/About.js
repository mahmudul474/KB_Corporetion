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

export default function About() {
  const mapStyles = {
  width: '100%',
  height: '400px'
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
                KB Corporation: Your Steel Solution Source
              </h2>
              <p className="mb-4 text-base leading-7 text-gray-500 dark:text-gray-black  text-left">
                KB Corporation is a reputable importer and distributor of steel
                coils and sheets, serving as a reliable supplier of high-quality
                steel products in Bangladesh. With a strategic location in South
                Korea, we maintain close ties with top manufacturers, ensuring a
                consistent supply of premium-grade materials that meet
                international standards. From wholesalers to manufacturers, our
                tailored solutions, competitive pricing, and exceptional
                customer service set us apart in the industry. At KB
                Corporation, we specialize in offering an extensive range of
                steel products, backed by a comprehensive inventory and a
                nationwide network of top-tier manufacturers. No matter the
                scope of your project, we've got you covered with a diverse
                selection of materials. Our inventory includes:
              </p>
              <ul className="mb-10 list-outside hover:list-inside">
                <li className="flex items-center mb-4 text-base text-black  ">
                  Cold Roll (CR) Coils, Sheets, and Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Excess Prime Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Cold Roll (CR) Coils, Sheets, and Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Grade 50 and Grade 80 Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  High Strength (HSLA) Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Hot Dip Galvanized (HD, GALV, HDG, GA) Coils and Sheets
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Hot Roll (HR) Coils, Sheets
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Prime and Secondary Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Low Carbon Steel
                </li>
                <li className="flex items-center mb-4 text-base text-black  dark:text-gray-400">
                  Hot Roll Pickled (HRPO) Coils, Sheets, and HRP&O
                </li>
              </ul>
              <a
                href="#"
                download=""
                className="px-4 py-2 text-gray-100 bg-[#719f18] rounded-md   hover:bg-[#719f18]"
              >
                Download Company Profile
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <div className=" my-5 flex flex-col justify-center my-4 items-center  ">
          <h1 className="text-3xl capitalize font-bold  text-black  ">
            {" "}
            Why Choose KB Corporation for Your Steel Needs
          </h1>

          <p className="text-center  text-gray-700 my-4 ">
            Explore on the world's best & largest Bidding marketplace with{" "}
            <br /> our beautiful Bidding products. We want to be a part of your
            smile, success and future growth.
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
                  Trusted Importer and Distributor
                </h3>
                <p className="text-base font-medium text-body-color">
                  As a leading importer and distributor of steel coils and
                  sheets, KB Corporation has built a solid reputation for
                  delivering high-quality steel products to meet the diverse
                  needs of our clients in Bangladesh.
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
                  Reliable Supplier with Global Reach
                </h3>
                <p className="text-base font-medium text-body-color">
                  With a strategic presence in South Korea, KB Corporation
                  maintains strong connections with top-tier manufacturers,
                  ensuring a steady supply of premium-grade steel materials that
                  conform to international standards.
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
                  Tailored Solutions for Your Business:
                </h3>
                <p className="text-base font-medium text-body-color">
                  From wholesalers to manufacturers, our expertise lies in
                  providing customized solutions that cater to your specific
                  requirements. Our competitive pricing and exceptional customer
                  service set us apart in the industry.
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
                  Diverse Selection of Materials:
                </h3>
                <p className="text-base font-medium text-body-color">
                  KB Corporation specializes in offering an array of steel
                  products to suit your needs. Our inventory includes Cold Roll
                  (CR) coils, sheets, Grade 50 and Grade 80 steel, High Strength
                  (HSLA) steel, Hot Dip Galvanized (HDG) coils and sheets, Hot
                  Roll (HR) coils, and more.
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
                  Comprehensive Inventory, Nationwide Network:
                </h3>
                <p className="text-base font-medium text-body-color">
                  Our extensive inventory encompasses a wide range of steel
                  products, backed by a nationwide network of reputable
                  manufacturers. Whether your project is small or large in
                  scope, we have the materials you need.
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
                  Commitment to Quality and Excellence:
                </h3>
                <p className="text-base font-medium text-body-color">
                  At KB Corporation, quality is at the forefront of everything
                  we do. Our commitment to excellence ensures that you receive
                  steel products of the highest standard, allowing you to build
                  and create with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl capitalize  font-semibold  text-black my-4 ">Our offics </h1>

        <div className=" px-4 py-5  flex  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8flex justify-center items-center flex-col  lg:flex-row ">
          <div className="w-full">
            <div className="w-[400px] h-[300px]">
              <img className="w-full  h-full object-cover" src={ban} />
            </div>
            <div className=" felx justify-start items-start text-left mt-5 text-black">
              <h4>KB CORPORATION</h4>
              <p>
                Address: P92V+9H3, Bonda Dekpara, Kadamtoli, Keranigoanj, Dhaka
                1310
              </p>
              <p>Email: kbsteelbd@gmail.com</p>
              <p>Cell number: +8801322674654</p>
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
