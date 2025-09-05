import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useAppDispatch } from "../app/hooks";
import RightSidebar from "./SideBar";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) =>
    Boolean(state.auth.isLoggedIn)
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={`${logo}`} className="h-10" alt="loading" />

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <>
              {/* Notification Bell */}
              <div className="relative flex items-center cursor-pointer m-4">
                <button onClick={() => setIsSidebarOpen(true)}>
                  <svg
                    className="w-6 h-6 text-gray-700 hover:text-orange-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </button>
                {/* Optional notification badge */}
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
              </div>

              {/* Profile Avatar */}
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src="https://placehold.co/40x40"
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div
                  className="absolute right-0 mt-8 w-40 bg-white rounded-lg shadow-lg p-2 grid grid-cols-1 gap-2 z-50"
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <Link
                    to={`/profile/${user?._id}`}
                    className="hover:bg-gray-500 px-4 py-2 rounded text-left"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hover:bg-gray-500 px-4 py-2 rounded text-left"
                  >
                    Logout
                  </button>
                </div>
              )}

              <RightSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
              {/* Optional: Overlay when sidebar is open */}
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-40 z-40"
                  onClick={() => setIsSidebarOpen(true)}
                ></div>
              )}
            </>
          ) : (
            <button
              type="button"
              className="w-full text-white bg-orange-400 hover:bg-teal-500 transition-all duration-500 ease-in-out transform hover:scale-105 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <Link to="/Login">LogIn</Link>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:p-0 
           ${
             isActive
               ? "text-teal-700 dark:text-teal-500"
               : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:dark:hover:text-teal-500"
           }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:p-0 
           ${
             isActive
               ? "text-teal-700 dark:text-teal-500"
               : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:dark:hover:text-teal-500"
           }`
                }
              >
                Properties
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/agents"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:p-0 
           ${
             isActive
               ? "text-teal-700 dark:text-teal-500"
               : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:dark:hover:text-teal-500"
           }`
                }
              >
                Agents
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/feedback"
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-sm md:p-0 
           ${
             isActive
               ? "text-teal-700 dark:text-teal-500"
               : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 md:dark:hover:text-teal-500"
           }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
