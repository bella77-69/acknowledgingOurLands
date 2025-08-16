import { useLocation, Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/Images/icon_one.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Discover", href: "/discover" },
  { name: "Learn More", href: "/learn-more" },
  { name: "Contact", href: "/contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  // Force re-render when login state changes
  useEffect(() => {}, [isLoggedIn]);

  return (
    <Disclosure as="nav" className="bg-customNav">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-customNavDark hover:bg-transparent hover:text-customWhite focus:outline-none focus:ring-2 focus:ring-inset focus:ring-customWhite">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                className="block size-6 group-data-[open]:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden size-6 group-data-[open]:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-active text-customWhite"
                      : "text-textWhite hover:bg-hover hover:text-customWhite",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-customWhite"
              >
                <span className="sr-only">Toggle Dark Mode</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* User Login / Logout */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full text-sm focus:outline-none text-customWhite transition transform duration-300 ease-out">
                  {user.name || user.email}
                </MenuButton>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full text-left transition transform duration-300 ease-out hover:translate-x-1"
                        )}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/register"
                  className="text-sm font-medium text-customWhite hover:bg-hover hover:text-customWhite px-3 py-2 rounded-md transition transform duration-300 ease-out hover:scale-105"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-medium text-customWhite hover:bg-hover hover:text-customWhite px-3 py-2 rounded-md transition transform duration-300 ease-out hover:scale-105"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
                location.pathname === item.href
                  ? "bg-active text-customWhite"
                  : "text-gray-300 hover:bg-hover hover:text-customWhite",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}

          <div className="flex items-center px-3 py-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-customWhite"
            >
              <span className="sr-only">Toggle Dark Mode</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-base font-medium text-customWhite hover:bg-hover px-3 py-2 rounded-md w-full text-left"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-1">
              <Link
                to="/register"
                className="block text-base font-medium text-customWhite hover:bg-hover px-3 py-2 rounded-md"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block text-base font-medium text-customWhite hover:bg-hover px-3 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
