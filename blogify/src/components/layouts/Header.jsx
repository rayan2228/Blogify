import Img from "./Img";
import logo from "../../assets/logo.svg";
import search from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import ModalWrapper from "../../modal/ModalWrapper";
import { useState } from "react";
const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const [showSearchModal, setShowSearchModal] = useState(false);
  return (
    <>
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

              <li
                onClick={() => setShowSearchModal(true)}
                className="flex items-center gap-x-1"
              >
                <Img src={search} alt="Search" />
                <span>Search</span>
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
      {showSearchModal && (
        <ModalWrapper onClose={() => setShowSearchModal(false)}>
          <>
            {/* Search */}
            <div>
              <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
                Search for Your Desire Blogs
              </h3>
              <input
                type="text"
                placeholder="Start Typing to Search"
                className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
              />
            </div>
            {/* Search Result */}
            <div className="">
              <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
              <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
                <div className="flex gap-6 py-2">
                  <img
                    className="object-contain h-28"
                    src="./assets/blogs/taiulwind-cn-thumb.jpg"
                    alt=""
                  />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-slate-300">
                      Style your components with TailwindCSS
                    </h3>
                    {/* Meta Informations */}
                    <p className="mt-1 mb-6 text-sm text-slate-500">
                      Aenean eleifend ante maecenas pulvinar montes lorem et
                      pede dis dolor pretium donec dictum. Vici consequat justo
                      enim. Venenatis eget adipiscing luctus lorem.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 py-2">
                  <img
                    className="object-contain h-28"
                    src="./assets/blogs/taiulwind-cn-thumb.jpg"
                    alt=""
                  />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-slate-300">
                      Style your components with TailwindCSS
                    </h3>
                    {/* Meta Informations */}
                    <p className="mt-1 mb-6 text-sm text-slate-500">
                      Aenean eleifend ante maecenas pulvinar montes lorem et
                      pede dis dolor pretium donec dictum. Vici consequat justo
                      enim. Venenatis eget adipiscing luctus lorem.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 py-2">
                  <img
                    className="object-contain h-28"
                    src="./assets/blogs/taiulwind-cn-thumb.jpg"
                    alt=""
                  />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-slate-300">
                      Style your components with TailwindCSS
                    </h3>
                    {/* Meta Informations */}
                    <p className="mt-1 mb-6 text-sm text-slate-500">
                      Aenean eleifend ante maecenas pulvinar montes lorem et
                      pede dis dolor pretium donec dictum. Vici consequat justo
                      enim. Venenatis eget adipiscing luctus lorem.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 py-2">
                  <img
                    className="object-contain h-28"
                    src="./assets/blogs/taiulwind-cn-thumb.jpg"
                    alt=""
                  />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-slate-300">
                      Style your components with TailwindCSS
                    </h3>
                    {/* Meta Informations */}
                    <p className="mt-1 mb-6 text-sm text-slate-500">
                      Aenean eleifend ante maecenas pulvinar montes lorem et
                      pede dis dolor pretium donec dictum. Vici consequat justo
                      enim. Venenatis eget adipiscing luctus lorem.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 py-2">
                  <img
                    className="object-contain h-28"
                    src="./assets/blogs/taiulwind-cn-thumb.jpg"
                    alt=""
                  />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-slate-300">
                      Style your components with TailwindCSS
                    </h3>
                    {/* Meta Informations */}
                    <p className="mt-1 mb-6 text-sm text-slate-500">
                      Aenean eleifend ante maecenas pulvinar montes lorem et
                      pede dis dolor pretium donec dictum. Vici consequat justo
                      enim. Venenatis eget adipiscing luctus lorem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        </ModalWrapper>
      )}
    </>
  );
};

export default Header;
