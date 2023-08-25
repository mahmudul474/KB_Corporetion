import { useContext, useState } from "react";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import mainLogo from "../../assets/mainLogo.png";
 import { FaTimes } from "react-icons/fa";

 const Navbar = () => {
   const { currentUser, logOut } = useContext(AuthContext);

   const [isAdmin] = useAdmin(currentUser?.email);

   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const [isProflieOpen, setIsProflieOpen] = useState(false);

   const handleLogOut = () => {
     logOut().then(() => {
       window.location.reload(true);
       toast.error("user Log-Out successfully");
     });
   };

   //sidebar  mobile screen
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const handleToggleSidebar = () => {
     setSidebarOpen(!sidebarOpen);
     console.log("sidebar is open ");
   };

   const navitem = (
     <>
       <Link to="/">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             Home
           </p>
         </li>
       </Link>
       <Link to="/about">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             Company
           </p>
         </li>
       </Link>
       <Link to="/cr">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             CR
           </p>
         </li>
       </Link>
       <Link to="/ga">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             GA
           </p>
         </li>
       </Link>
       <Link to="/po">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             PO
           </p>
         </li>
       </Link>
       <Link to="/events">
         <li>
           <p
             title="Our product"
             className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
           >
             Events
           </p>
         </li>
       </Link>
       {currentUser ? (
         <>
           <div className="relative ml-3">
             {currentUser.role === "" ||
               (currentUser.role === "bidder" && (
                 <Link to="/my-dashboard">
                   <li
                     onClick={() => setIsProflieOpen(false)}
                     className="block px-4  text-sm text-gray-700"
                     role="menuitem"
                     tabindex="-1"
                     id="user-menu-item-0"
                   >
                     Dashboard
                   </li>
                 </Link>
               ))}

             {isAdmin && (
               <Link to="/admin-dashboard">
                 <li
                   onClick={() => setIsProflieOpen(false)}
                   className="block px-4 text-sm text-gray-700"
                   role="menuitem"
                   tabindex="-1"
                   id="user-menu-item-0"
                 >
                   Admin Dashboard
                 </li>
               </Link>
             )}
           </div>

           <li
             className="block px-4 text-sm text-gray-700"
             role="menuitem"
             tabindex="-1"
             id="user-menu-item-0"
           >
             {" "}
             <div className="dropdown dropdown-end">
               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                 <div className="w-10 rounded-full">
                   <img src={currentUser.userPhoto} />
                 </div>
               </label>
               <ul
                 tabIndex={0}
                 className="mt-3 z-50 p-2 shadow  menu menu-sm dropdown-content bg-gray-400 text-black rounded-box w-52"
               >
                 <Link to="/my-dashboard">
                   <li>
                     <a className="justify-between ">Profile</a>
                   </li>
                 </Link>
                 <li onClick={handleLogOut}>
                   <a className="text-red-500">Logout</a>
                 </li>
               </ul>
             </div>
           </li>
         </>
       ) : (
         <>
           <Link to="/login">
             <li onClick={() => setIsMenuOpen(false)}>
               <p
                 title="Our product"
                 className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
               >
                 Login
               </p>
             </li>
           </Link>
         </>
       )}
     </>
   );

   return (
     <div className="border  bg-slate-50 border-bottom shadow-2xl   text-black ">
       {" "}
       <div className="px-4 py-5  m-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
         <div className="relative flex items-center justify-between">
           <a
             href="/"
             aria-label="Company"
             title="Company"
             className="inline-flex    items-center"
           >
             <img className=" h-[50px]  object-contain" src={logo} />
             <span className="   text-3xl  font-semibold  text-black uppercase">
               Auction KB
             </span>
           </a>
           <ul className="flex items-center md:flex hidden space-x-8 lg:flex">
             {navitem}
           </ul>
           <div className="lg:hidden md:hidden">
             <button
               aria-label="Open Menu "
               title="Open Menu"
               className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
               onClick={handleToggleSidebar}
             >
               <svg className="w-5 " viewBox="0 0 24 24">
                 <path
                   fill="currentColor"
                   d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                 />
                 <path
                   fill="currentColor"
                   d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                 />
                 <path
                   fill="currentColor"
                   d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                 />
               </svg>
             </button>
             <div
               className={`${
                 sidebarOpen
                   ? "translate-x-0 w-56  z-50 lg:hidden"
                   : "-translate-x-[3000px]"
               } bg-gray-200 w-56 h-screen fixed lg:hidden top-0 left-0 shadow-md z-50 transform transition-transform duration-300 ease-in-out`}
             >
               {/* Sidebar content */}
               <span
                 className="absolute top-4 right-4 cursor-pointer"
                 onClick={handleToggleSidebar}
               >
                 <FaTimes />
               </span>

               <aside className="w-full p-6 sm:w-60   text-black ">
                 <div className="space-y-8 text-sm">
                   <Link to="/" onClick={handleToggleSidebar}>
                     <p
                       onClick={handleToggleSidebar}
                       title="kb"
                       className="font-medium hover:underline w-full shadow-md p-2 my-3 tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                     >
                       Home
                     </p>
                   </Link>
                   <Link to="/about" onClick={handleToggleSidebar}>
                     <p
                       onClick={handleToggleSidebar}
                       title="kb"
                       className="font-medium hover:underline w-full shadow-md p-2 my-3 tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                     >
                       Company
                     </p>
                   </Link>

                   <>
                     <Link to="/cr" onClick={handleToggleSidebar}>
                       <p
                         title="Our product"
                         className="font-medium  w-full shadow-md p-2 my-3   tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                       >
                         CR
                       </p>
                     </Link>
                     <Link to="/ga" onClick={handleToggleSidebar}>
                       <p
                         title="Our product"
                         className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                       >
                         GA
                       </p>
                     </Link>
                     <Link to="/po" onClick={handleToggleSidebar}>
                       <p
                         title="Our product"
                         className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                       >
                         PO
                       </p>
                     </Link>
                     <Link to="/events" onClick={handleToggleSidebar}>
                       <p
                         title="Our product"
                         className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                       >
                         Events
                       </p>
                     </Link>
                     {currentUser ? (
                       <>
                         <li
                           className="block px-4 text-sm w-full shadow-md p-2 my-3  text-black "
                           role="menuitem"
                           tabindex="-1"
                           id="user-menu-item-0"
                         >
                           {" "}
                           <div className="dropdown dropdown-end">
                             <label
                               tabIndex={0}
                               className="btn btn-ghost btn-circle avatar"
                             >
                               <div className="w-10 rounded-full">
                                 <img src={currentUser.userPhoto} />
                               </div>
                             </label>

                             <div className="relative ml-3">
                               {currentUser.role === "" ||
                                 (currentUser.role === "bidder" && (
                                   <Link
                                     to="/my-dashboard"
                                     onClick={handleToggleSidebar}
                                   >
                                     <p
                                       onClick={() => setIsProflieOpen(false)}
                                       className="block px-4  w-full shadow-md p-2 my-3  text-sm text-black "
                                       role="menuitem"
                                       tabindex="-1"
                                       id="user-menu-item-0"
                                     >
                                       Dashboard
                                     </p>
                                   </Link>
                                 ))}
                             </div>

                             <Link
                               to="/my-dashboard"
                               onClick={handleToggleSidebar}
                             >
                               <p
                                 className=" w-full shadow-md p-2 my-3 "
                                 block
                                 px-4
                                 text-sm
                                 text-gray-700
                               >
                                 {" "}
                                 <a className="justify-between">Profile</a>
                               </p>
                             </Link>
                             {isAdmin && (
                               <Link
                                 to="/admin-dashboard"
                                 onClick={handleToggleSidebar}
                               >
                                 <p
                                   onClick={() => setIsProflieOpen(false)}
                                   className="block px-4  w-full shadow-md p-2 my-3  text-sm text-gray-700"
                                   role="menuitem"
                                   tabindex="-1"
                                   id="user-menu-item-0"
                                 >
                                   Admin Dashboard
                                 </p>
                               </Link>
                             )}

                             <p
                               onClick={() => {
                                 handleLogOut();
                                 handleToggleSidebar();
                               }}
                             >
                               <a className="text-red-500 w-full  shadow-md p-2 my-3 ">
                                 Logout
                               </a>
                             </p>
                           </div>
                         </li>
                       </>
                     ) : (
                       <>
                         <Link to="/login">
                           <li onClick={() => setIsMenuOpen(false)}>
                             <p
                               title="Our product"
                               className="font-medium tracking-wide  w-full  shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                             >
                               Login
                             </p>
                           </li>
                         </Link>
                       </>
                     )}
                   </>
                 </div>
               </aside>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

export default Navbar;
