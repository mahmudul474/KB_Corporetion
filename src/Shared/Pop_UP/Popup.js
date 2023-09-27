import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import { toast } from "react-hot-toast";

const Popup = ({ onClose }) => {
  const { forgatPassword } = useContext(AuthContext);

  const [formValue, setFormValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();

    forgatPassword(formValue)
      .then(() => {
        toast.success("check your  email and reset your password");
      })
      .catch(error => {
        const errorCode = error.code;
        toast.error(error.message);
        const errorMessage = error.message;
         toast.error(errorMessage);
        // ..
      });
    onClose();
  };

  const handleCancel = () => {
    // Close the popup without submitting the form
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 flex shadow-lg  bg-base-200    m-auto items-center justify-center">
      <div className=" bg-white shadow-2xl  rounded-lg p-8">
        <h2 className="text-2xl mb-4   text-black ">
          Please Enter Your Account Email{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="input" className="block mb-2"></label>
            <input
              required
              id="input"
              type="email"
              placeholder="email"
              value={formValue}
              onChange={e => setFormValue(e.target.value)}
              className="border border-gray-300 bg-white text-black  p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-[#719f18] mr-2 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="bg-[#73471b] text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
