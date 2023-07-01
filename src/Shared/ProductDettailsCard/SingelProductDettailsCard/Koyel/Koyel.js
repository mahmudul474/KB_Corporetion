import React, { useState } from "react";

export default function Koyel({ koyel, selectedItems, setSelectedItems }) {
 
  const [selectAll, setSelectAll] = useState(false);


  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(koyel);
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
    <div className="relative overflow-x-scroll overflow-y-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2   dark:border-gray-600"
                />
                <label for="checkbox-all-search" className="sr-only">
                  Select
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              ITEM
            </th>
            <th scope="col" className="px-6 py-3">
              SPEC
            </th>
            <th scope="col" className="px-6 py-3">
              THICKNESS
            </th>
            <th scope="col" className="px-6 py-3">
              WIDTH
            </th>
            <th scope="col" className="px-6 py-3">
              TS
            </th>
            <th scope="col" className="px-6 py-3">
              YP
            </th>
            <th scope="col" className="px-6 py-3">
              EL
            </th>
            <th scope="col" className="px-6 py-3">
              startTing Price
            </th>
            <th scope="col" className="px-6 py-3">
              curent Price
            </th>
          </tr>
        </thead>
        <tbody>
          {koyel?.slice(1).map(skoyel => (
            <tr className="bg-white border-b     hover:bg-gray-50  ">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${skoyel?._id}`}
                    type="checkbox"
                    checked={selectedItems.some(
                      item => item._id === skoyel?._id
                    )}
                    onChange={() => toggleItemSelection(skoyel._id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500    focus:ring-2    "
                  />
                  <label for="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {skoyel?.item}
              </th>

              <td className="px-6 py-4">{skoyel?.spec}</td>
              <td className="px-6 py-4">{skoyel?.Thickness}</td>
              <td className="px-6 py-4">{skoyel?.Width}</td>
              <td className="px-6 py-4">{skoyel?.TS}</td>
              <td className="px-6 py-4">{skoyel?.YP}</td>
              <td className="px-6 py-4">{skoyel?.EL}</td>
              <td className="px-6 py-4">{skoyel?.currentBid}</td>
              <td className="flex items-center px-6 py-4 space-x-3">
                {skoyel.bids && skoyel.bids.length === 0
                  ? skoyel?.currentBid
                  : skoyel.bids[skoyel.bids.length - 1].bidAmount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
