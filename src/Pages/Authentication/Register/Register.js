import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth/AuthProbaider/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { signUpUser, updateUser } = useContext(AuthContext);
  const  navigete=useNavigate("")

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [nidCardImg, setNidCardImg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");


  


  const handlePhotoChange = e => {
    setUserPhoto(e.target.files[0]);
  };

  const handleNIDCardChange = e => {
    setNidCardImg(e.target.files[0]);
  };

  const handleRegistration = e => {
    e.preventDefault();
    signUpUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        //save user database


        const userInfo = {
          displayName: firstName + lastName,
        };
        updateUser(userInfo)
        .then(() => {
             saveData(user.email);
             navigete("/")
             
        }).catch(err => console.log(err));

      
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const saveData = async (userEmail,) => {
    try {
      const formData = new FormData();
      formData.append("name", firstName + lastName);
      formData.append("email", userEmail);
      formData.append("password", password);
      formData.append("userPhoto", userPhoto);
      formData.append("nidCardImg", nidCardImg);
      formData.append("phoneNumber", phoneNumber);

   

      const response = await axios.post(
        "http://localhost:5000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );


      console.log("api  is hit ")
      setMessage(response.data.message);
    } catch (err) {
      console.error(err);
      setMessage("Registration failed");
    }
  };

  return (
    <>
      <div className=" px-4 py-10  m-auto mt-10 shadow-2xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8  bottom-0 bg-white rounded-2xl ">
        <div className="container ">
          <div className="sm:flex sm:flex-col    sm:w-full lg:flex-row lg:w-full">
            <div className="lg:w-3/4 sm:w-full px-16">
              <div className="my-10 text-center">
                <h1 className="text-3xl capitalize  mb-1 font-semibold ">
                  SIGN UP
                </h1>
                <h3 className="text-lg ">We're happy you're here!</h3>
              </div>

              <hr />

              <form className="my-10" onSubmit={handleRegistration}>
                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="my-1   w-full">
                    <label
                      for="Fname"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      type="text"
                      name="Fname"
                      id="Fname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="john "
                      required
                    />
                  </div>
                  <div className="my-1 w-full">
                    <label
                      for="Lname"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="Lname"
                      onChange={e => setLastName(e.target.value)}
                      value={lastName}
                      id="Lname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="doe"
                      required=""
                    />
                  </div>
                </div>

                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="my-1 w-full">
                    <label
                      for="email"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                  <div className="my-1 w-full">
                    <label
                      for="Phone"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="Phone"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      id="Phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile number"
                       required
                    />
                  </div>
                </div>

                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="my-1 w-full">
                    <label
                      for="ProfilePic"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      name="profile"
                      id="profile"
                      placeholder="profile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="my-1 w-full">
                    <label
                      for="nidPas"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nid or Passport
                    </label>
                    <input
                      name="nidPas"
                      id="nidPas"
                      type="file"
                      accept="image/*"
                      onChange={handleNIDCardChange}
                      placeholder="upload nid or passport"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="my-1 w-full">
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
                    required
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
                </div>
                <button
                  type="submit"
                  className="w-1/3 text-white bg-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                >
                  Sign up
                </button>
              </form>
            </div>
            <div className="lg:w-1/4 sm:w-full bg-[#442db9] rounded-md py-16 ">
              <div className="mt-24 text-white my-10">
                <h1 className="text-3xl font-semibold">
                  ALREADY HAVE AN ACCOUNT?
                </h1>
                <h2>Log in and go to your Dashboard.</h2>
              </div>{" "}
              <div className="mb-4 mx-4 ">
                <button
                  type="button"
                  className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



//////buissnes name
// trade licencse no. 
// business  tin no. 
// business address 
