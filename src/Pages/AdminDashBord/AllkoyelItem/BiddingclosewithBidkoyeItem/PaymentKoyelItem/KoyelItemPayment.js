import React from "react";
import { useLoaderData } from "react-router-dom";

export default function KoyelItemPayment() {
  const data = useLoaderData();

  console.log(data);
  return (
    <div>
      <div className="flex justify-between flex-col lg:flex-row ">
        <div className="border w-full border-black">
          <div className="overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Job</td>
                  <td>company</td>
                  <td>location</td>
                  <td>Last Login</td>
                  <td>Favorite Color</td>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.winners?.map(winner => (
                  <tr>
                    <td>{winner?.bidderName}</td>
                    <td>Quality Control Specialist</td>
                    <td>Littel, Schaden and Vandervort</td>
                    <td>Canada</td>
                    <td>12/16/2020</td>
                    <td>Blue</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border w-full border-black">2</div>
      </div>
    </div>
  );
}
