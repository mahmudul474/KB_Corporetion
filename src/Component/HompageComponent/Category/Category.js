import { Link } from "react-router-dom";
import cr from "./assates/CR.png";
import gi from "./assates/GI.png";
import hr from "./assates/HR.png";
import event from "./assates/Event.png";

export default function Category() {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="flex justify-start my-10 flex-col items-start ">
        <h1 className="text-3xl font-bold text-black ">
          Next Generation Auction
        </h1>
        <h4 className="text-black ">
          Explore on the world's best & largest Bidding marketplace with our
          beautiful
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
       
<div className="card   shadow-2xl">
  <div className="bg-[#5e748b] rounded-t-xl">
  <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black"> Cold Rolled sell</h4>{" "}
            <h1 className="text-xl font-bold text-black">CR</h1>
            <p className="text-sm text-black">
              Precision-grade steel for versatile applications.
            </p>
            <div className="flex justify-start items-start my-3 ">
            <Link to="/cr">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
          </div>
  </div>
  <figure><img src={cr} alt="Shoes" /></figure>
</div>
<div className="card   shadow-2xl">
  <div className="bg-[#efc686] rounded-t-xl">
  <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Galvanized steel  sell
</h4>{" "}
            <h1 className="text-xl font-bold text-black">GI/GA</h1>
            <p className="text-sm text-black">
            Corrosion-resistant steel with enduring strength.
            </p>
            <div className="flex justify-start items-start my-3 ">
            <Link to="/ga">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
          </div>
  </div>
  <figure><img src={gi} alt="ga/gi" /></figure>
</div>



<div className="card   shadow-2xl">
  <div className="bg-[#9cb1c4] rounded-t-xl">
  <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Hot Rolled Steel sell
</h4>{" "}
            <h1 className="text-xl font-bold text-black ">PO/HR</h1>
            <p className="text-sm text-black">
            Structural steel for robust<br/>
projects.
            </p>
            <div className="flex justify-start items-start my-3 ">
            <Link to="/po">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
          </div>
  </div>
  <figure><img src={hr} alt="hr" /></figure>
</div>


<div className="card   shadow-2xl">
  <div className="bg-[#d06c4c] rounded-t-xl">
  <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Event Highlights
</h4>{" "}
            <h1 className="text-xl font-bold text-black">Events</h1>
            <p className="text-sm text-black">
            tay informed about industry insights.<br/>
projects.
            </p>
            <div className="flex justify-start items-start my-3 ">
            <Link to="/events">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
          </div>
  </div>
  <figure><img src={event} alt="event" /></figure>
</div>

 
 
        {/* <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-md font-semibold text-black">
              Galvanized steel,
            </h4>

            <h1 className="text-xl font-bold text-black">GA</h1>
            <p>Corrosion-resistant steel with enduring strength.</p>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-contain "
            src={gi}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <Link to="/ga">
              {" "}
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
        </div>
        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-md font-semibold text-black">
              Hot Rolled Steel
            </h4>
            <h1 className="text-xl font-bold text-black">PO</h1>
            <p>Structural steel for robust <br/> projects.</p>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-contain "
            src={hr}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <Link to="/po">
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/View-more"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
        </div>

        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-md font-semibold text-black ">
              Event Highlights
            </h4>
            <h1 className="text-xl font-semibold text-black ">Events</h1>
            <p>Stay informed about industry insights.</p>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-contain "
            src={event}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <Link to="/events">
              {" "}
              <a
                className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-black focus:outline-none focus:ring active:text-indigo-500"
                href="/download"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <svg
                    className="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4">
                  View-more
                </span>
              </a>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
