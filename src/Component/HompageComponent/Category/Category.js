import { Link } from "react-router-dom";
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
           <Link to="/cr" >
           <a
  class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/View-more"
>
  <span class="absolute -end-full transition-all group-hover:end-4">
    <svg
      class="h-5 w-5 rtl:rotate-180"
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

  <span class="text-sm font-medium transition-all group-hover:me-4">
    View-more
  </span>
</a>
</Link>
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
        <Link to="/ga"> <a
  class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/View-more"
>
  <span class="absolute -end-full transition-all group-hover:end-4">
    <svg
      class="h-5 w-5 rtl:rotate-180"
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

  <span class="text-sm font-medium transition-all group-hover:me-4">
    View-more
  </span>
</a>
</Link> 
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
          <Link to="/po"><a
  class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/View-more"
>
  <span class="absolute -end-full transition-all group-hover:end-4">
    <svg
      class="h-5 w-5 rtl:rotate-180"
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

  <span class="text-sm font-medium transition-all group-hover:me-4">
    View-more
  </span>
</a>
</Link> 
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
      
          <Link to="/events"> <a
  class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-3 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
  href="/download"
>
  <span class="absolute -end-full transition-all group-hover:end-4">
    <svg
      class="h-5 w-5 rtl:rotate-180"
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

  <span class="text-sm font-medium transition-all group-hover:me-4">
    View-more 
  </span>
</a>
</Link> 
          </div>
        </div>
      </div>
    </div>
  );
}
