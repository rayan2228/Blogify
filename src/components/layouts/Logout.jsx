import { useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import actions from "../../reducers/actions";
import { toast, Bounce } from "react-toastify";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
const Logout = () => {
  const { setAuth } = useAuth();
  const { dispatch: profileDispatch } = useProfile();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      profileDispatch({ type: actions.profile.logout });
      setAuth({});
      localStorage.removeItem("_blogify");
      Cookies.remove("_blogifyAccessToken");
      Cookies.remove("_blogifyRefreshToken");
      toast.success("logout successfully", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/");
    } catch (error) {
      toast.error(error?.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  return (
    <button
      className="px-6 py-2 text-white transition-all duration-200 bg-red-600 rounded-md md:py-3 hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
