import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Popup from "../../../Shared/Pop_UP/Popup";

export default function Login() {
  const { loginUser } = useContext(AuthContext);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = event => {
    event.preventDefault();
    loginUser(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        checkuser(user?.email);
        console.log(user, "this is user for my site is betting ");
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      });
  };

  //sava user  data based
  const checkuser = email => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => res.json())
      .then(data => {
        toast.success(data.message);
        navigate(from, { replace: true });
      })
      .catch(er => {
        toast.error(er.message);
      });
  };

  return (
    <>
      <div className=" px-4 py-10  mt-10 shadow-2xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:mx-16 md:px-24 lg:px-8  bottom-0 bg-white rounded-2xl  ">
        <div className="container ">
          <div className="sm:flex sm:flex-col    sm:w-full lg:flex-row lg:w-full">
            <div className="lg:w-3/4 sm:w-full px-16">
              <div className="my-10 text-center">
                <h1 className="text-3xl capitalize  mb-1 font-semibold ">
                  HI, THERE
                </h1>
                <h3 className="text-lg ">
                  You can log in to your KB account here.
                </h3>
              </div>

              <hr />

              <form className="my-10" onSubmit={handleLogin}>
                <p className="text-center  my-4  text-red">{errorMessage}</p>
                <div className="my-1">
                  <label
                    for="email"
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@gmail.com"
                    required=""
                  />
                </div>
                <div className="my-1">
                  <label
                    for="password"
                    className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center my-2 justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm ">
                      <label
                        for="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={openPopup}
                      className="   py-2 px-4  "
                    >
                      Forgot password?
                    </button>
                    {showPopup && <Popup onClose={closePopup} />}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-1/3 text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="lg:w-1/4 sm:w-full bg-[#442db9] rounded-md py-16 ">
              <div className="mt-24 text-white my-10">
                <h1 className="text-3xl font-semibold">NEW HERE?</h1>
                <h2>Sign up and create your Account</h2>
              </div>{" "}
              <div className="mb-4 mx-4 ">
                <Link to="/register">
                  <button
                    type="button"
                    className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
                  >
                    Sing Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
