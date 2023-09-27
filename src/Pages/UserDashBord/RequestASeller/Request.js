import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";

export default function Request() {
  const { currentUser } = useContext(AuthContext);

  const [myrequest, setMyrequest] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    if (currentUser) {
      const userInfo = {
        name: currentUser.name,
        email: currentUser?.email,
        userPhoto: currentUser?.userPhoto
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/seller/requests/${currentUser?.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userInfo)
        }
      )
        .then(response => response.json())
        .then(data => {
          toast.success(data.message);
          window.location.reload(true);
        })
        .catch(error => {
          toast.error(error.message);
        });
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetch(
        `${process.env.REACT_APP_API_URL}/user/my-request/${currentUser?.email}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not OK");
          }
          return response.json();
        })
        .then(data => {
          setMyrequest(data);
        })
        .catch(error => {
          // Handle the error appropriately (e.g., show an error message, fallback behavior)
          console.error("Error fetching data:", error);
        });
    }
  }, [currentUser]);

  return (
    <div>
      {!myrequest || !myrequest.status ? (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center  mt-28">
            <h1 className="text-2xl capitalize font-semibold text-center">
              send seller account request
            </h1>
          </div>

          <button
            type="submit "
            className="btn mt-4  bg-green-600 p-3  rounded  text-white"
          >
            Sent Request
          </button>
        </form>
      ) : (
        <div className="">
          <h1 className="text-green capitalize    block    lg:mt-52 text-2xl">
            Send request succefully
          </h1>
          <p className="text-2xl  text-green-600">Status: {myrequest.status}</p>
        </div>
      )}
    </div>
  );
}
