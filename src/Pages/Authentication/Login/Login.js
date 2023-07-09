import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Popup from "../../../Shared/Pop_UP/Popup";
import UserSpinner from "../../../Shared/UserSpinner/UserSpinner";
import useToken from "../../../Hooks/useToken";
import LoadingSpiner from "../../../Shared/LoadingSpiner/LoadingSpiner";

export default function Login() {
  const { loginUser, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [token] = useToken(createUserEmail);

  if (token) {
    navigate(from, { replace: true });
  }

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

  const handleLogin = event => {
    event.preventDefault();
    loginUser(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        checkuser(user?.email);
      })
      .catch(error => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage, errorCode);
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
        setCreateUserEmail(email);
        toast.success(data.message);
      })
      .catch(er => {
        setErrorMessage(er.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <LoadingSpiner></LoadingSpiner>;
  }
  return (
    <>
      <div className=" px-4 py-10  m-auto    my-16 shadow-2xl  block sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:mx-auto md:px-24 lg:px-8  m-auto  bottom-0 bg-white rounded-2xl  ">
        <div className="container  m-auto  ">
          <div className="sm:flex sm:flex-col    sm:w-full lg:flex-row lg:w-full">
            <div className="lg:w-3/4 sm:w-full md:px-10 lg:px-16">
              <div className="my-10 text-center">
                <h1 className="text-3xl capitalize text-black mb-1 font-semibold ">
                  HI, THERE
                </h1>
                <h3 className="text-lg text-black ">
                  You can log in to your KB account here.
                </h3>
              </div>

              <hr />

              <form className="my-10" onSubmit={handleLogin}>
                <div className="my-1">
                  <label
                    for="email"
                    className="block text-left mb-2 text-sm font-medium text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className=" bg-white  border border-gray-300 text-black  font-semibold sm:text-sm rounded-lg     block w-full p-2.5    "
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className="my-1">
                  <label
                    for="password"
                    className="block text-left mb-2  font-medium text-black  "
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
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    required
                  />
                </div>
                <div className="flex items-center my-2 justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded  focus:ring-3       "
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm ">
                      <label for="remember" className="text-black ">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div>
                    <p
                      onClick={openPopup}
                      className="   text-black   underline py-2 px-4  "
                    >
                      Forgot password?
                    </p>
                  </div>
                </div>

                <p className="text-red-500  mb-3 text-center">{errorMessage}</p>

                <button
                  type="submit"
                  className="w-1/3 text-white bg-[#719f18] hover:bg-[#73471b] focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="lg:w-1/4 sm:w-full  bg-[#73471b]  rounded-md py-16 ">
              <div className="mt-24 text-white my-10">
                <h1 className="text-3xl font-semibold ">NEW HERE?</h1>
                <h2>Sign up and create your Account</h2>
              </div>{" "}
              <div className="mb-4 mx-4 ">
                <Link to="/register">
                  <button
                    type="button"
                    className="flex justify-center items-center max-w-sm w-full  bg-[#719f18]   focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
                  >
                    Sing Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>{showPopup && <Popup onClose={closePopup} />}</div>
      </div>
    </>
  );
}
