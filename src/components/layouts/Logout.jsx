import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import actions from "../../reducers/actions";

const Logout = () => {
  const { setAuth } = useAuth();
  const { dispatch: profileDispatch } = useProfile();
  const handleLogout = () => {
    try {
      profileDispatch({ type: actions.profile.logout });
      setAuth({});
    } catch (error) {
      console.log(error);
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
