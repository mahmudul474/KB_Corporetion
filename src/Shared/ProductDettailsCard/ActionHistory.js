import React from "react";

export default function ActionHistory({ bids }) {
  console.log(bids);

  return (
    <div className="my-10   ">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-green-600 border-b border-green-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3 bg-green-500">
                Bidder
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3 bg-green-500">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-600 border-b border-green-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium bg-green-500 text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://i.ibb.co/NFRvMnj/image.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">06/16/2021</td>
              <td className="px-6 py-4 bg-green-500">02:45:25 PM</td>
              <td className="px-6 py-4">$2999</td>
            </tr>

            <tr className="bg-green-600 border-b border-green-400">
              <th
                scope="row"
                className="px-6 py-4 font-medium bg-green-500 text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://i.ibb.co/NFRvMnj/image.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">06/16/2021</td>
              <td className="px-6 py-4 bg-green-500">02:45:25 PM</td>
              <td className="px-6 py-4">$799</td>
            </tr>
            <tr className="bg-green-600 border-blue-40">
              <th
                scope="row"
                className="px-6 py-4 font-medium bg-green-500 text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="https://i.ibb.co/NFRvMnj/image.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </th>
              <td className="px-6 py-4">06/16/2021</td>
              <td className="px-6 py-4 bg-green-500">02:45:25 PM</td>
              <td className="px-6 py-4">$999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
