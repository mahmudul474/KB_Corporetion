import { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import { FaTimes } from "react-icons/fa";
import { useTranslation } from "../../Component/TranslationProvider/TranslationProvider";
import LanguageSwitcher from "../../Component/TranslationProvider/LanguageSwitcher";

const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext);
  const { translate } = useTranslation();

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
            className=" tracking-wide  font-bold text-xl transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "home")}
          </p>
        </li>
      </Link>{" "}
      <Link to="/about">
        <li>
          <p
            title="Our product"
            className=" tracking-wide text-xl  font-bold  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "company")}
          </p>
        </li>
      </Link>
      <Link to="/cr">
        <li>
          <p
            title="Our product"
            className=" tracking-wide  font-bold  text-xl  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "cr")}
          </p>
        </li>
      </Link>
      <Link to="/ga">
        <li>
          <p
            title="Our product"
            className=" tracking-wide font-bold  text-xl  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "gi")}
          </p>
        </li>
      </Link>
      <Link to="/po">
        <li>
          <p
            title="Our product"
            className="tracking-wide font-bold  text-xl  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "po")}
          </p>
        </li>
      </Link>
      <Link to="/events">
        <li>
          <p
            title="Our product"
            className=" tracking-wide font-bold  text-xl  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            {translate("navbar", "event")}
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
                    className="block px-4 text-xl   font-bold  text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    {translate("navbar", "dashbord")}
                  </li>
                </Link>
              ))}

            {isAdmin && (
              <Link to="/admin-dashboard">
                <li
                  onClick={() => setIsProflieOpen(false)}
                  className="block px-4 font-bold  text-xl text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  {" "}
                  {translate("navbar", "admin")}
                </li>
              </Link>
            )}
          </div>

          <li
            className="block text-xl  text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-0"
          >
            {" "}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  <img src={currentUser.userPhoto} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-50 p-2 shadow  menu menu-sm dropdown-content bg-gray-400 text-black rounded-box w-52"
              >
                <Link to="/my-dashboard">
                  <li>
                    <a className="justify-between   font-bold text-xl">
                      {translate("navbar", "profile")}
                    </a>
                  </li>
                </Link>
                <li onClick={handleLogOut}>
                  <a className="text-red-500 font-bold text-xl">
                    {" "}
                    {translate("navbar", "logout")}
                  </a>
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
                className=" tracking-wide  font-bold text-xl transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                   {translate("navbar", "login")}
              </p>
            </li>
          </Link>
        </>
      )}
      <div className="flex ">
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </>
  );

  return (
    <div className="border  bg-slate-50 border-bottom    text-black ">
      {" "}
      <div className="px-4 py-5  m-auto  md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            className="inline-flex   justify-center  items-center "
          >
            <img className=" h-[30px] md:h-[35px] lg:h-[60px]" src={logo} />
            <p className="lg:text-[40px]  lg:font-[bold] md:text-[30px] text-[18px]">
              Dong Heng <span className="text-[#008ece]">S&T</span>
            </p>
          </a>
          <ul className="flex items-center md:flex hidden space-x-8 lg:flex">
            {navitem}
          </ul>
          <div className="lg:hidden flex flex-row space-x-3 md:hidden">
            <>
            <LanguageSwitcher></LanguageSwitcher>
            </>

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
                      {translate("navbar", "home")}
                    </p>
                  </Link>
                  <Link to="/about" onClick={handleToggleSidebar}>
                    <p
                      onClick={handleToggleSidebar}
                      title="kb"
                      className="font-medium hover:underline w-full shadow-md p-2 my-3 tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      {translate("navbar", "company")}
                    </p>
                  </Link>

                  <>
                    <Link to="/cr" onClick={handleToggleSidebar}>
                      <p
                        title="Our product"
                        className="font-medium  w-full shadow-md p-2 my-3   tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        {translate("navbar", "cr")}
                      </p>
                    </Link>
                    <Link to="/ga" onClick={handleToggleSidebar}>
                      <p
                        title="Our product"
                        className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        {translate("navbar", "gi")}
                      </p>
                    </Link>
                    <Link to="/po" onClick={handleToggleSidebar}>
                      <p
                        title="Our product"
                        className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        {translate("navbar", "po")}
                      </p>
                    </Link>
                    <Link to="/events" onClick={handleToggleSidebar}>
                      <p
                        title="Our product"
                        className="font-medium tracking-wide  w-full shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        {translate("navbar", "event")}
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
                                      {translate("navbar", "dashbord")}
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
                                <a className="justify-between">
                                  {" "}
                                  {translate("navbar", "profile")}
                                </a>
                              </p>
                            </Link>
                            {isAdmin && (
                              <Link
                                to="/admin-dashboard"
                                onClick={handleToggleSidebar}
                              >
                                <p
                                  onClick={() => setIsProflieOpen(false)}
                                  className="block px-4  w-full shadow-md p-2 my-3  text-gray-700"
                                  role="menuitem"
                                  tabindex="-1"
                                  id="user-menu-item-0"
                                >
                                  {translate("navbar", "admin")}
                                </p>
                              </Link>
                            )}

                            <p
                              onClick={() => {
                                handleLogOut();
                                handleToggleSidebar();
                              }}
                            >
                              <a className="text-red-500 w-full  font-bold   shadow-md p-2 my-3 ">
                                {translate("navbar", "logout")}
                              </a>
                            </p>
                          </div>
                        </li>
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <p onClick={() => setIsMenuOpen(false)}>
                            <p
                              onClick={handleToggleSidebar}
                              title="Our product"
                              className="font-medium tracking-wide font-bold    w-full  shadow-md p-2 my-3  transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              {translate("navbar", "login")}
                            </p>
                          </p>
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
