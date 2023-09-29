import React, { useState } from "react";

export default function Koyel({ koyel, selectedItems, setSelectedItems }) {
 
  const [selectAll, setSelectAll] = useState(false);


  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const filterSoldOutKoyelItem = koyel?.filter(
        koyel => koyel.status !== "sold-out"
      );

      setSelectedItems(filterSoldOutKoyelItem);
    } else {
      setSelectedItems([]);
    }
  };

  const toggleItemSelection = itemId => {
    if (selectedItems.some(item => item._id === itemId)) {
      setSelectedItems(selectedItems.filter(item => item._id !== itemId));
    } else {
      const item = koyel.find(item => item._id === itemId);
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="  w-full  overflow-auto  md:h-[500px] h-[300px]  lg:h-[600px] shadow-md sm:rounded-lg">
      <table className="table table-xs table-pin-rows  ">
        <thead>
          <tr>
            <th className="bg-white">
              <div className="flex items-center">
                <input
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   "
                />
                <label for="checkbox-all-search" className="sr-only">
                  Select
                </label>
              </div>
            </th>
            <th className="bg-white text-black">ITEM</th>
            <th className="bg-white text-black">SPEC</th>
            <th className="bg-white text-black">THICKNESS</th>
            <th className="bg-white text-black">WIDTH</th>
            <th className="bg-white text-black">WEIGHT</th>
            <th className="bg-white text-black">TS</th>
            <th className="bg-white text-black">YP</th>
            <th className="bg-white text-black">EL</th>
            <th className="bg-white text-black">start Price</th>
            <th className="bg-white text-black">current Price</th>
            <th className="bg-white text-black">Buy Price</th>
            <th className="bg-white text-black">winner</th>
          </tr>
        </thead>
        <tbody>
          {koyel?.map(skoyel => (
            <tr className="bg-white      hover:bg-gray-50  ">
              <td className="w-4 p-4">
                {skoyel?.status === "sold-out" ? (
                  <button className="btn bg-red-500 text-white btn-xs">
                    sold
                  </button>
                ) : (
                  <div className="flex items-center">
                    <input
                      id={`checkbox-item-${skoyel?._id}`}
                      type="checkbox"
                      checked={selectedItems.some(
                        item => item._id === skoyel?._id
                      )}
                      onChange={() => toggleItemSelection(skoyel._id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2    "
                    />
                    <label for="checkbox-table-search-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                )}
              </td>
              <td className="text-black">{skoyel?.item}</td>
              <td className="text-black">{skoyel?.spec}</td>
              <td className="text-black">{skoyel?.Thickness}</td>
              <td className="text-black">{skoyel?.Width}</td>
              <td className="text-black">{skoyel?.weight + "kg"}</td>
              <td className="text-black">{skoyel?.TS}</td>
              <td className="text-black">{skoyel?.YP}</td>
              <td className="text-black">{skoyel?.EL}</td>
              <td className="text-black">{skoyel?.currentBid}</td>
              <td className=" text-black ">
                {skoyel.bids && skoyel.bids.length === 0
                  ? skoyel?.currentBid
                  : skoyel.bids[skoyel.bids.length - 1].bidAmount.toFixed(2)}
              </td>
              <td className="text-black">{skoyel?.buyNowPrice}</td>
              <td>
                {skoyel?.winner && (
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={skoyel?.winner.bidderPhoto} alt="winner" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-black">
                        {skoyel?.winner.bidderName}
                      </div>
                      <div className="text-sm text-black opacity-50">
                        Price:{skoyel?.winner?.bidAmount + "$"}
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="bg-white">
              <div className="flex items-center">
                <input
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   "
                />
                <label for="checkbox-all-search" className="sr-only">
                  Select
                </label>
              </div>
            </th>
            <th className="bg-white text-black">ITEM</th>
            <th className="bg-white text-black">SPEC</th>
            <th className="bg-white text-black">THICKNESS</th>
            <th className="bg-white text-black">WIDTH</th>
            <th className="bg-white text-black">WEIGHT</th>
            <th className="bg-white text-black">TS</th>
            <th className="bg-white text-black">YP</th>
            <th className="bg-white text-black">EL</th>
            <th className="bg-white text-black">start Price</th>
            <th className="bg-white text-black">current Price</th>
            <th className="bg-white text-black">Buy Price</th>
            <th className="bg-white text-black">winner</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
