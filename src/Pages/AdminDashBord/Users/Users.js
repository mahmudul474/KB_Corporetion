import React, { useEffect, useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function Users() {
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const data = await res.json();
      return data;
    }
  });

  const handlemakeAdmin = id => {
    fetch(`${process.env.REACT_APP_API_URL}/user/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.accessToken === true) {
          toast.success("make admin succefully ");
          refetch();
        }
        toast.error(data.message);
      });
  };

  return (
    <div className="">
      <h1 className="capitalize text-2xl m-4 font-bold"> users</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  user
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Make seller
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Admin
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            {users?.map(user => (
              <tbody>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.userPhoto}
                      alt="user photo"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user?.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user?.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>{" "}
                      Make seller
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {" "}
                      {user?.role === "admin" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></div>
                          <button className="bg-green-700 btn p-3 rounded-xl text-white disabled">
                            Admin
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div>
                          <button
                            className="cursor-pointer"
                            onClick={() => handlemakeAdmin(user?._id)}
                          >
                            Make Admin
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Active
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      X
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
