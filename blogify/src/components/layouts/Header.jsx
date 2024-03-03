import Img from "./Img";
import logo from "../../assets/logo.svg";
import search from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Header = () => {
  const { auth } = useAuth();
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
            {!auth.user && (
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
            {auth.user && (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                <Link to={"/profile"}>
                  <div className="flex items-center">
                    <div className="text-white bg-orange-600 avater-img">
                      <span className="">S</span>
                      {/* User's first name initial */}
                    </div>
                    {/* Logged-in user's name */}
                    <span className="ml-2 text-white">Saad Hasan</span>
                    {/* Profile Image */}
                  </div>
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
