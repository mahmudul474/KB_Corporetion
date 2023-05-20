import React from 'react'

export default function Register() {
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

              <form className="my-10">
                <div className="flex justify-between flex-col lg:flex-row">
                  <div className="my-1   w-full">
                    <label
                      for="Fname"
                      className="block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
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
                      id="Phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Mobile number"
                      required=""
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
                      name="profile"
                      id="profile"
                      placeholder="profile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
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
                      type="file"
                      name="nidPas"
                      id="nidPas"
                      placeholder="upload nid or passport"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
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




// import React, { useState } from "react";
// import axios from "axios";
// import Select from "react-select";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [img, setImg] = useState(null);
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [countryCode, setCountryCode] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

  

//   const handleFormSubmit = async e => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("name", name);
//     formData.append("img", img);
//     formData.append("mobileNumber", countryCode.value + mobileNumber);

//     try {
//       const response = await axios.post("/register", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       setSuccessMessage(response.data.message);
//       setErrorMessage("");
//     } catch (error) {
//       setErrorMessage(error.response.data.error);
//       setSuccessMessage("");
//     }
//   };
//   return (
//     <>
//       <div className=" px-4 py-10  m-auto mt-10 shadow-2xl mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8  bottom-0 bg-white rounded-2xl ">
//         <div className="container ">
//           <div className="sm:flex sm:flex-col    sm:w-full lg:flex-row lg:w-full">
//             <div className="lg:w-3/4 sm:w-full px-16">
//               <div className="my-10 text-center">
//                 <h1 className="text-3xl capitalize  mb-1 font-semibold ">
//                   SIGN UP
//                 </h1>
//                 <h3 className="text-lg ">We're happy you're here!</h3>
//               </div>

//               <div className="my-5">
//                 <button
//                   type="button"
//                   className="hover:text-white hover:bg-green-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border-green-600 border text-green-600  mr-2 mb-2"
//                 >
//                   <svg
//                     className="w-4 h-4 mr-2 -ml-1"
//                     aria-hidden="true"
//                     focusable="false"
//                     data-prefix="fab"
//                     data-icon="facebook-f"
//                     role="img"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 320 512"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
//                     ></path>
//                   </svg>
//                   Sign in with Facebook
//                 </button>

//                 <button
//                   type="button"
//                   className="hover:text-white hover:bg-green-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border-green-600 border text-green-600  mr-2 mb-2"
//                 >
//                   <svg
//                     className="w-4 h-4 mr-2 -ml-1"
//                     aria-hidden="true"
//                     focusable="false"
//                     data-prefix="fab"
//                     data-icon="google"
//                     role="img"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 488 512"
//                   >
//                     <path
//                       fill="currentColor"
//                       d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
//                     ></path>
//                   </svg>
//                   Sign in with Google
//                 </button>
//               </div>
//               <hr />

//               <div>
//                 <h2>User Registration</h2>
//                 {errorMessage && <div>{errorMessage}</div>}
//                 {successMessage && <div>{successMessage}</div>}
//                 <form onSubmit={handleFormSubmit}>
//                   <div>
//                     <label>Email:</label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={e => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label>Password:</label>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={e => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label>Name:</label>
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={e => setName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label>Profile Image:</label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={e => setImg(e.target.files[0])}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label>Mobile Number:</label>
//                     <div>
//                       <Select
//                         options={countryOptions}
//                         value={countryCode}
//                         onChange={option => setCountryCode(option)}
//                         placeholder="Select Country Code"
//                         isSearchable={false}
//                         required
//                       />
//                       <input
//                         type="tel"
//                         value={mobileNumber}
//                         onChange={e => setMobileNumber(e.target.value)}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <button type="submit">Register</button>
//                 </form>
//               </div>
//             </div>
//             <div className="lg:w-1/4 sm:w-full bg-[#442db9] rounded-md py-16 ">
//               <div className="mt-24 text-white my-10">
//                 <h1 className="text-3xl font-semibold">
//                   ALREADY HAVE AN ACCOUNT?
//                 </h1>
//                 <h2>Log in and go to your Dashboard.</h2>
//               </div>{" "}
//               <div className="mb-4 mx-4 ">
//                 <button
//                   type="button"
//                   className="flex justify-center items-center max-w-sm w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none text-white text-xl uppercase shadow-md rounded-lg mx-auto p-2"
//                 >
//                   Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
