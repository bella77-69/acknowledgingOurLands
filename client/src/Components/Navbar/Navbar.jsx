import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/Images/icon_one.png";

const baseNavigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Discover", href: "/discover" },
  { name: "Learn More", href: "/learn-more" },
  { name: "Contact", href: "/contact" },
];

const authenticatedNavigation = [{ name: "Dashboard", href: "/dashboard" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const navigation = [
    ...baseNavigation,
    ...(isLoggedIn ? authenticatedNavigation : []),
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-customNav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-customNavDark hover:bg-hover hover:text-customWhite focus:outline-none focus:ring-2 focus:ring-inset focus:ring-customWhite">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="Logo" />
                </div>

                <div className="hidden lg:ml-6 lg:flex items-center space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-active text-customWhite"
                          : "text-textWhite hover:bg-hover hover:text-customWhite",
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0 space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full text-customWhite hover:bg-hover focus:outline-none focus:ring-2 focus:ring-customWhite"
                  aria-label={darkMode ? "Light mode" : "Dark mode"}
                >
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

                {isLoggedIn ? (
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-customWhite">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center">
                        <span className="ml-3 text-sm font-medium text-customWhite">
                          {user?.first_name || user?.email}
                        </span>
                        <svg
                          className="ml-1 h-4 w-4 text-customWhite"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <div className="hidden lg:flex space-x-2">
                    <Link
                      to="/register"
                      className="text-sm font-medium text-customWhite hover:bg-hover hover:text-customWhite px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-customWhite hover:bg-hover hover:text-customWhite px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
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

              <div className="pt-4 border-t border-gray-700">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center px-3 py-2">
                      <span className="text-sm font-medium text-customWhite">
                        Signed in as {user?.first_name || user?.email}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-customWhite hover:bg-hover"
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-customWhite hover:bg-hover"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="block px-3 py-2 rounded-md text-base font-medium text-customWhite hover:bg-hover"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium text-customWhite hover:bg-hover"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
