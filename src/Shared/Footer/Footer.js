import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import faq from "./FAQ.pdf";
import priveciPoleci from "./PrivacyPolicy.pdf";
import refundPolecy from "./Refund.pdf";
import returnPolecy from "./ReturnPolicy.pdf";
import termsOfcondition from "./TermsCondition.pdf";
import accesciblity from "./Accessibility.pdf";
 

export default function Footer() {
  return (
    <div className="px-4 py-5 mx-auto  md:px-24 lg:px-8">
      <footer class="relative z-10 bg-white pt-20 pb-10 lg:pt-[120px] lg:pb-20">
        <div class="container mx-auto">
          <div class="-mx-4 flex flex-wrap">
            <div class="w-full px-4 sm:w-2/3 lg:w-3/12">
              <div class="mb-10 w-full">
                <a href=" " class="mb-6 flex  justify-start items-start  ">
                  <img src={logo} alt="logo" class="max-w-full" />
                </a>

                <h3 className="text-xl font-bold text-left mb-3 ">
                  KOREA CONTACT
                </h3>
                <p class="text-dark flex items-center text-sm font-medium">
                  <span className="font-bold ">
                    Dong Haeng Steel & Trading Co. LTD
                  </span>
                </p>

                <p class="text-dark flex items-start text-left text-sm font-medium">
                  <span className="items-start text-left ">
                    Tel. 02-6231-1219, Fax, 02-866-2438
                  </span>
                </p>
                <p class="text-dark flex items-start text-left text-sm font-medium">
                  <span className="items-start text-left ">
                    Address: 1201-1 Boeksang, 2nd star Tower, 165 Gasondifital
                    2ro ghmcheon-gu, Seoui, Korea
                  </span>
                </p>
              </div>
            </div>

            <div class="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div class="mb-10 w-full lg:pt-[109px]">
                <h3 className="text-xl font-bold text-left mb-3 ">
                  BANGLADESH CONTACT
                </h3>
                <p class="text-dark flex items-center text-sm font-medium">
                  <span className="font-bold ">KB CORPORATION</span>
                </p>

                <p class="text-dark flex items-start text-left text-sm font-medium">
                  <span className="items-start text-left ">
                    Email: kbsteelbd@gmail.com
                  </span>
                </p>
                <p class="text-dark flex items-start text-left text-sm font-medium">
                  <span className="items-start text-left ">
                    Phone +8801322674654
                  </span>
                </p>
                <p class="text-dark flex items-start text-left text-sm font-medium">
                  <span className="items-start text-left ">
                    Address: p92V + 9H#, Bonda Dekpara, Kadamtoli Keraniganj,
                    Dhaka-1301
                  </span>
                </p>
              </div>
            </div>
            <div class="w-full px-4 sm:w-1/2 lg:w-2/12">
              <div class="mb-10 w-full">
                <h4 class="text-dark mb-9 text-lg font-semibold">Resources</h4>
                <ul>
                  <li>
                    <Link
                      to="/about"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <a
                      href={termsOfcondition}
                      download="termsOfcondition.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      Terms & Condition
                    </a>
                  </li>
                  <li>
                    <a
                      href={accesciblity}
                      download="accesciblity.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      Accessibility
                    </a>
                  </li>
                  <li>
                    <a
                      href={faq}
                      download="faq.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full px-4 sm:w-1/2 lg:w-2/12">
              <div class="mb-10 w-full">
                <h4 class="text-dark mb-9 text-lg font-semibold">
                  Quick Links
                </h4>
                <ul>
                  <li>
                    <a
                      href={priveciPoleci}
                      download="priveciPoleci.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href={returnPolecy}
                      download="returnPolecy.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      Return Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href={refundPolecy}
                      download="returnPolecy.pdf"
                      class="text-body-color hover:text-primary mb-2 inline-block text-base leading-loose"
                    >
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full px-4 sm:w-1/2 lg:w-2/12">
              <div class="mb-10 w-full">
                <h4 class="text-dark mb-9 text-lg font-semibold">
                  Follow Us On
                </h4>
                <div class="mb-6 flex items-center">
                  <a
                    href="https://www.facebook.com/auctionkb "
                    class="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg
                      width="8"
                      height="16"
                      viewBox="0 0 8 16"
                      class="fill-current"
                    >
                      <path d="M7.43902 6.4H6.19918H5.75639V5.88387V4.28387V3.76774H6.19918H7.12906C7.3726 3.76774 7.57186 3.56129 7.57186 3.25161V0.516129C7.57186 0.232258 7.39474 0 7.12906 0H5.51285C3.76379 0 2.54609 1.44516 2.54609 3.5871V5.83226V6.34839H2.10329H0.597778C0.287819 6.34839 0 6.63226 0 7.04516V8.90323C0 9.26452 0.243539 9.6 0.597778 9.6H2.05902H2.50181V10.1161V15.3032C2.50181 15.6645 2.74535 16 3.09959 16H5.18075C5.31359 16 5.42429 15.9226 5.51285 15.8194C5.60141 15.7161 5.66783 15.5355 5.66783 15.3806V10.1419V9.62581H6.13276H7.12906C7.41688 9.62581 7.63828 9.41935 7.68256 9.10968V9.08387V9.05806L7.99252 7.27742C8.01466 7.09677 7.99252 6.89032 7.85968 6.68387C7.8154 6.55484 7.61614 6.42581 7.43902 6.4Z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/stories/auctionkb/3127728109791938671?utm_source=ig_story_item_share&igshid=NjZiM2M3MzIxNA== "
                    class="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 32 32"
                    >
                      <path d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://maps.app.goo.gl/DaVAEr2eWfW41gTH8"
                    class="text-dark hover:bg-primary hover:border-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-white sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 36 2 C 32.460938 2 29.292969 3.554688 27.09375 6 L 6.34375 6 C 3.960938 6 2 7.960938 2 10.34375 L 2 43.21875 C 1.984375 43.324219 1.984375 43.425781 2 43.53125 L 2 43.65625 C 2 46.039063 3.960938 48 6.34375 48 L 39.65625 48 C 42.039063 48 44 46.039063 44 43.65625 L 44 43.5625 C 44.015625 43.457031 44.015625 43.355469 44 43.25 L 44 23.4375 C 46.105469 20.632813 48 17.894531 48 14 C 48 7.382813 42.617188 2 36 2 Z M 36 4 C 41.535156 4 46 8.464844 46 14 C 46 17.414063 44.308594 19.691406 42.09375 22.625 C 39.972656 25.433594 37.476563 28.824219 36 33.9375 C 34.523438 28.824219 32.027344 25.433594 29.90625 22.625 C 29.082031 21.53125 28.308594 20.535156 27.6875 19.53125 C 27.6875 19.519531 27.6875 19.511719 27.6875 19.5 C 27.675781 19.480469 27.667969 19.457031 27.65625 19.4375 C 27.613281 19.273438 27.527344 19.121094 27.40625 19 C 26.542969 17.480469 26 15.921875 26 14 C 26 8.464844 30.464844 4 36 4 Z M 6.34375 8 L 25.625 8 C 24.597656 9.765625 24 11.8125 24 14 C 24 16.136719 24.578125 17.917969 25.4375 19.5625 L 4 40.96875 L 4 10.34375 C 4 9.042969 5.042969 8 6.34375 8 Z M 12.125 10 C 8.75 10 6 12.75 6 16.125 C 6 19.5 8.75 22.21875 12.125 22.21875 C 17.46875 22.21875 18.378906 17.414063 17.875 15.03125 L 12.125 15.03125 L 12.125 17.375 L 15.4375 17.375 C 15.003906 18.789063 13.835938 19.8125 12.125 19.8125 C 10.089844 19.8125 8.4375 18.160156 8.4375 16.125 C 8.4375 14.089844 10.089844 12.4375 12.125 12.4375 C 13.039063 12.4375 13.855469 12.761719 14.5 13.3125 L 16.21875 11.59375 C 15.132813 10.605469 13.710938 10 12.125 10 Z M 36 10 C 33.800781 10 32 11.800781 32 14 C 32 16.199219 33.800781 18 36 18 C 38.199219 18 40 16.199219 40 14 C 40 11.800781 38.199219 10 36 10 Z M 36 12 C 37.117188 12 38 12.882813 38 14 C 38 15.117188 37.117188 16 36 16 C 34.882813 16 34 15.117188 34 14 C 34 12.882813 34.882813 12 36 12 Z M 26.5 21.3125 C 27.0625 22.160156 27.648438 23.007813 28.28125 23.84375 C 28.289063 23.855469 28.304688 23.863281 28.3125 23.875 L 6.21875 45.96875 C 5.023438 45.902344 4.097656 44.976563 4.03125 43.78125 Z M 29.5 25.5 C 30.929688 27.453125 32.355469 29.621094 33.4375 32.4375 L 28 27 Z M 42 26.15625 L 42 40.96875 L 37.34375 36.34375 C 37.390625 36.261719 37.441406 36.167969 37.46875 36.09375 C 37.632813 35.660156 37.613281 35.375 37.6875 35.09375 C 38.683594 31.265625 40.3125 28.523438 42 26.15625 Z M 26.59375 28.40625 L 41.96875 43.78125 C 41.902344 44.976563 40.976563 45.902344 39.78125 45.96875 L 24.40625 30.59375 Z M 23 32 L 36.96875 46 L 9.03125 46 Z"></path>
                    </svg>
                  </a>
                </div>
                <p class="text-body-color text-base">&copy; 2023 Auction-KB</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span class="absolute left-0 bottom-0 z-[-1]">
            <svg
              width="217"
              height="229"
              viewBox="0 0 217 229"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
                fill="url(#paint0_linear_1179_5)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1179_5"
                  x1="76.5"
                  y1="281"
                  x2="76.5"
                  y2="1.22829e-05"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#3056D3" stop-opacity="0.08" />
                  <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="absolute top-10 right-10 z-[-1]">
            <svg
              width="75"
              height="75"
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
                fill="url(#paint0_linear_1179_4)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1179_4"
                  x1="-1.63917e-06"
                  y1="37.5"
                  x2="75"
                  y2="37.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#13C296" stop-opacity="0.31" />
                  <stop offset="1" stop-color="#C4C4C4" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </footer>
    </div>
  );
}
