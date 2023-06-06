import React, { useEffect, useState } from "react";
import Animation from "../../../Shared/Animation/Animation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import ActiveBidder from "./Active_Bidder/ActiveBidder";
import AdminMessageSent from "../../../Component/AdminMessageSent/AdminMessageSent";
import ConfirmationModal from "../../../Shared/ConfirmationModal/ConfirmationModal";

export default function Users() {
  const [userInfo, setUserinfo] = useState({});

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`);
      const data = await res.json();
      return data;
    }
  });

  ///make    admin
  const handlemakeAdmin = id => {
    fetch(`${process.env.REACT_APP_API_URL}/user/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        toast.success("make admin succefully ");
        refetch();
      });
  };

  ///delete user

  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmationPopup, setConfirmationPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const openConfirmationPopup = () => {
    setConfirmationPopup(true);
  };

  const closeConfirmationPopup = () => {
    setConfirmationPopup(false);
  };

  //delete user
  const [deleteuser, setDeleteuser] = useState(null);
  const handleDlete = () => {
    fetch(`${process.env.REACT_APP_API_URL}/delete/user/${deleteuser?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        refetch();
        toast.success(data.message);
        closeConfirmationPopup();
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
                  Make Admin
                </th>
                <th scope="col" className="px-6 py-3">
                  Make Bidder
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
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
                      {" "}
                      {user?.role === "admin" ? (
                        <>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2"></div>
                          <button className="bg-green-700 btn p-3 rounded-xl text-white disabled">
                            {user?.role}
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
                  <td className="px-6 py-4" onClick={() => setUserinfo(user)}>
                    {user?.role === "bidder" ? (
                      <p className="font-medium  disabled bg-green-600 p-2 dark:text-green-600 text-white rounded-lg hover:underline">
                        {user?.role}
                      </p>
                    ) : (
                      <p
                        onClick={openPopup}
                        className="font-medium cursor-pointer text-green-600 dark:text-green-600 hover:underline"
                      >
                        Active
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <AdminMessageSent user={user}></AdminMessageSent>
                  </td>
                  <td
                    onClick={() => {
                      setDeleteuser(user);
                      openConfirmationPopup();
                    }}
                    className="px-6 py-4 cursor-pointer"
                  >
                    <p className="font-medium text-green-600 dark:text-green-600 hover:underline">
                      X
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div>
        {showPopup && <ActiveBidder userInfo={userInfo} onClose={closePopup} />}
      </div>
      <div>
        {showConfirmationPopup && (
          <ConfirmationModal
            data={"are you sure   delete " + deleteuser?.name}
            submit={handleDlete}
            onClose={closeConfirmationPopup}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
}
