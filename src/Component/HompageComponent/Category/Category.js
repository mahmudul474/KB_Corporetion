import cr from "./cr.png";
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
        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Steel trade</h4>
            <h1 className="text-xl font-bold text-black">CR</h1>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-cover "
            src={cr}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <button
              type="button"
              class="text-black   border border-black bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center    "
            >
              view more
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Steel trade</h4>
            <h1 className="text-xl font-bold text-black">GA</h1>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-cover "
            src={cr}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <button
              type="button"
              class="text-black   border border-black bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center    "
            >
              view more
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black">Steel trade</h4>
            <h1 className="text-xl font-bold text-black">PO</h1>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-cover "
            src={cr}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <button
              type="button"
              class="text-black   border border-black bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center    "
            >
              view more
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="  bg-slate-200 cursor-pointer shadow-2xl border  rounded-md">
          <div className="text-left p-5">
            <h4 className="text-lg font-semibold text-black ">Steel trade</h4>
            <h1 className="text-xl font-semibold text-black ">Events</h1>
          </div>
          <img
            className="w-full p-5 h-[150px] m-auto  object-cover "
            src={cr}
          />
          <div className="flex justify-start items-start my-3 p-5">
            <button
              type="button"
              class="text-black   border border-black bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center    "
            >
              view more
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
