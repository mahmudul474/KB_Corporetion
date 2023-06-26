import "./Upcoommings.css";
import All from "./All/All";

function Upcommings() {
  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="text-center my-5">
        <h1 className="text-4xl mb-3  font-semibold">Upcoming Auctions</h1>
        <p className="text-lg text-gray-500">
          You are welcome to attend and join in the action at any of our
          upcoming auctions.
        </p>
      </div>
      <div>
        <All></All>
      </div>
    </div>
  );
}

export default Upcommings;
