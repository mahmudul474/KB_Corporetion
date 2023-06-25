import { useContext, useState } from "react";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProbaider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import mainLogo from "../../assets/mainLogo.png";

const Navbar = () => {
  const { currentUser, logOut } = useContext(AuthContext);

  const [isAdmin] = useAdmin(currentUser?.email);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuctionOpen, setIsAuctionOpen] = useState(false);
  const [isProflieOpen, setIsProflieOpen] = useState(false);

  const handleLogOut = () => {
    logOut().then(() => {
      window.location.reload(true);
      toast.error("user Log-Out successfully");
    });
  };

  const navitem = (
    <>
      <Link to="/">
        <li onClick={() => setIsMenuOpen(false)}>
          <p
            title="Our product"
            className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            Home
          </p>
        </li>
      </Link>

      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          Hover
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="bg-green-500">
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>

      <div className="relative ml-3">
        <div>
          <li
            onClick={() => {
              setIsAuctionOpen(true);
              setIsMenuOpen(false);
            }}
          >
            <p
              title="Our product "
              className="font-medium cursor-pointer tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Auctions
            </p>
          </li>
        </div>

        {isAuctionOpen && (
          <div
            className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 text-left ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
          >
            <Link to="/this-week">
              <li
                onClick={() => setIsAuctionOpen(false)}
                className="block px-2 py-2 text-md text-gray-700 hover:bg-green-600 hover: "
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >
                This Week
              </li>
            </Link>
            <Link to="/this-month">
              <li
                onClick={() => setIsAuctionOpen(false)}
                className="block px-2 py-2 text-md text-gray-700 hover:bg-green-600 hover: "
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >
                This Month
              </li>
            </Link>
            <Link to="/others">
              <li
                onClick={() => setIsAuctionOpen(false)}
                className="block px-2 py-2  hover:bg-green-600 hover: text-md text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >
                Others
              </li>
            </Link>
          </div>
        )}
      </div>
      <Link to="/winners">
        <li onClick={() => setIsMenuOpen(false)}>
          <p
            title="Our product"
            className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            Winners
          </p>
        </li>
      </Link>
      <Link to="/about">
        <li>
          <p
            title="Our product"
            className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
          >
            About
          </p>
        </li>
      </Link>
      {currentUser ? (
        <div className="relative ml-3">
          <div>
            <button
              onClick={() => {
                setIsProflieOpen(true);
              }}
              type="button"
              className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <div className="h-14 w-14 object-contain">
                <img
                  className=" rounded-full  object-cover w-full h-full "
                  src={currentUser.userPhoto}
                  alt="user photo"
                />
              </div>
            </button>
          </div>

          {isProflieOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <Link to="/my-dashboard">
                <li
                  onClick={() => setIsProflieOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Dashboard
                </li>
              </Link>
              {isAdmin && (
                <Link to="/admin-dashboard">
                  <li
                    onClick={() => setIsProflieOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Admin Dashboard
                  </li>
                </Link>
              )}

              <li
                onClick={handleLogOut}
                className="block px-4 py-2 text-sm text-red-600 cursor-pointer"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
              >
                Sign out
              </li>
            </div>
          )}
        </div>
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
          <Link to="/register">
            <li onClick={() => setIsMenuOpen(false)}>
              <p
                title="Our product"
                className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Sing-up
              </p>
            </li>
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="border border-bottom shadow-2xl bg-base-200 text-black ">
      {" "}
      <div className="px-4 py-5 mx-auto  md:px-6 lg:px-10">
        <div className="relative flex items-center justify-between">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex w-24 h-8  items-center"
          >
            <img className="object-cover" src={mainLogo} />
          </Link>
          <ul className="flex items-center md:flex hidden space-x-8 lg:flex">
            {navitem}
          </ul>
          <div className="lg:hidden md:hidden">
            <button
              aria-label="Open Menu "
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
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
            {isMenuOpen && (
              <div className="absolute top-0 left-0  w-full z-40">
                <div className="p-5 bg-red z-40 border bg-green-600 rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <a
                        href="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                      >
                        <svg
                          className="w-8 text-deep-purple-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide  uppercase">
                          KB-Corporation
                        </span>
                      </a>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-white focus:bg-white focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 " viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav className="bg-red">
                    <ul className="space-y-4">{navitem}</ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
