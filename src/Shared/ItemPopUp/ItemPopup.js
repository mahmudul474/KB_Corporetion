import React from "react";

export default function ItemPopup({ data, close }) {
  return (
    <div className="fixed z-50 inset-0  flex items-center justify-center ">
      <div className="bg-slate-400 p-14  rounded-lg">
        <h3 className="text-md my-5  ">
          koyel Item
          <span className="text-2xl capitalize font-semibold text-green-800 ml-2 "></span>{" "}
        </h3>

        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <td>item</td>
                <td>spec</td>
                <td>Thickness</td>
                <td>Width</td>
                <td>Ts</td>
                <td>Yp</td>
                <td>El</td>
                <td>amount</td>
              </tr>
            </thead>
            <tbody>
              {data?.map(item => (
                <tr>
                  <td>{item?.item}</td>
                  <td>{item?.spec}</td>
                  <td>{item?.Thickness}</td>
                  <td>{item?.Width}</td>
                  <td>{item?.TS}</td>
                  <th>{item?.YP}</th>
                  <th>{item?.EL}</th>
                  <th>{item?.bidAmount}$</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={() => close()}
          className="bg-green-600 text-white py-2 px-4 rounded "
        >
          close
        </button>
      </div>
    </div>
  );
}
