import React from "react";

const ConfirmationModal = ({ onClose, data, submit }) => {
  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };
  return (
    <div className="fixed z-50 inset-0  flex items-center justify-center ">
      <div className="bg-white shadow-2xl  p-14  rounded-lg">
        <h3 className="text-md my-5   text-black ">
          Are you sure you want to delete
          <span className="text-2xl capitalize font-semibold text-green-800 ml-2 ">
            {data}
          </span>{" "}
        </h3>

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
          className="bg-[#719f18] text-white py-2 px-4 rounded "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
