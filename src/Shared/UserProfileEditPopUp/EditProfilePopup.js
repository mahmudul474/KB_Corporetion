import React, { useState } from "react";

const EditProfilePopup = ({ onClose }) => {
  const [formValue, setFormValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // Process form data here
    // ...

    // Close the popup after form submission
    onClose();
  };

  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-slate-400 rounded-lg p-8 w-96">
        <h2 className="text-2xl mb-4">Popup Title</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input" className="block mb-2">
              Input Label
            </label>
            <input
              id="input"
              type="text"
              value={formValue}
              onChange={e => setFormValue(e.target.value)}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;
