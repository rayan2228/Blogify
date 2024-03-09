import Img from "./Img";
import logo from "../../assets/logo.svg";
import search from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();
  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <Img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>
        {/* Actions - Login, Write, Home, Search */}
        {/* Notes for Developers */}
        {/* For Logged in User - Write, Profile, Logout Menu */}
        {/* For Not Logged in User - Login Menu */}
        <div>
          <ul className="flex items-center space-x-5">
            {auth.user && (
              <li>
                <Link
                  to="/blog-write"
                  className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                >
                  Write
                </Link>
              </li>
            )}

            <li>
              <a
                href="./search.html"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Img src={search} alt="Search" />
                <span>Search</span>
              </a>
            </li>

            {auth.user && (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                <Link to={`/profile/${auth?.user?.id}`}>
                  <div className="flex items-center">
                    {state?.user?.avatar || auth?.user?.avatar ? (
                      <Img
                        src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                          state?.user?.avatar ?? auth?.user?.avatar
                        }`}
                        className={"rounded-full w-8 h-8 object-cover"}
                      />
                    ) : (
                      <div className="text-white bg-orange-600 avater-img">
                        <span className="">
                          {auth?.user?.firstName?.charAt(0) ||
                            state?.user?.firstName?.charAt(0)}
                        </span>
                        {/* User's first name initial */}
                      </div>
                    )}
                    {/* Logged-in user's name */}
                    <span className="ml-2 text-white">
                      {auth?.user?.firstName || state?.user?.firstName}{" "}
                      {auth?.user?.lastName || state?.user?.lastName}
                    </span>
                    {/* Profile Image */}
                  </div>
                </Link>
              </li>
            )}
            {auth.user ? (
              <li>
                <Link
                  to="/logout"
                  className="px-6 py-2 text-white transition-all duration-200 bg-red-600 rounded-md md:py-3 hover:bg-red-700"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="transition-all duration-200 text-white/50 hover:text-white"
                >
                  {" "}
                  Login{" "}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
