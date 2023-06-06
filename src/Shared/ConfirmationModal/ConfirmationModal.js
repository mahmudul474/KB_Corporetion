import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import { FiEdit } from "react-icons/fi";

import { toast } from "react-hot-toast";

const ConfirmationModal = ({ onClose, data, submit }) => {
  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0  flex items-center justify-center ">
      <div className="bg-slate-400 p-14  rounded-lg">
        <h3 className="text-lg my-5  text-red-500">{data}</h3>

        <button
          onClick={submit}
          type="submit"
          className="bg-red-600 mr-3 text-white py-2 px-4 rounded "
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-green-600 text-white py-2 px-4 rounded "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
