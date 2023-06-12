import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminMessageSent({ user }) {
  const [message, setMessage] = useState("");
  console.log(message);

  const handlesendMassage = e => {
    e.preventDefault();

    const msg = {
      message
    };

    fetch(`${process.env.REACT_APP_API_URL}/admin/messages/${user?._id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(msg)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("message  sent successfully");
          setMessage("");
        }
      });
  };
  return (
    <form onSubmit={handlesendMassage}>
      <label
        for="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      ></label>
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="type message"
          id="search"
          className="block w-full p-4 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-600"
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          send
        </button>
      </div>
    </form>
  );
}
