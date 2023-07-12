import React from "react";

export default function ItemPopup({ data, close }) {
  return (
    <div className="fixed z-50 inset-0 bg-base-100 flex items-center justify-center ">
      <div className="bg-white p-14  rounded-lg">
        <h3 className="text-md my-5  ">
          koyel Item
          <span className="text-2xl capitalize font-semibold text-green-800 ml-2 "></span>{" "}
        </h3>

        <div className="overflow-auto h-[400px]">
          <table className="table bg-white table-xs table-pin-rows table-pin-cols">
            <thead className="bg-black text-white">
              <tr className="bg-black text-white">
                <td className="bg-black text-white">item</td>
                <td className="bg-black text-white">spec</td>
                <td className="bg-black text-white">Thickness</td>
                <td className="bg-black text-white">Width</td>
                <td className="bg-black text-white"> Weight</td>
                <td className="bg-black text-white">Ts</td>
                <td className="bg-black text-white">Yp</td>
                <td className="bg-black text-white">El</td>
                <td className="bg-black text-white">amount</td>
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <tr>
                  <td className="bg-white text-black">{item?.item}</td>
                  <td className="bg-white text-black">{item?.spec}</td>
                  <td className="bg-white text-black">{item?.Thickness}</td>
                  <td className="bg-white text-black">{item?.Width}</td>
                  <td className="bg-white text-black">{item?.weight}</td>
                  <td className="bg-white text-black">{item?.TS}</td>
                  <th className="bg-white text-black">{item?.YP}</th>
                  <th className="bg-white text-black">{item?.EL}</th>
                  <th className="bg-white text-black">{item?.bidAmount}$</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={() => close()}
          className="bg-[#719f18]  btn m-auto block mt-3   hover:bg-[#719f18] text-white py-2 px-4 rounded "
        >
          close
        </button>
      </div>
    </div>
  );
}
