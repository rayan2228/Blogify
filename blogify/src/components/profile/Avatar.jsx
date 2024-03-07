import Img from "../../components/layouts/Img";
import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import actions from "../../reducers/actions";
const Avatar = () => {
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const uploadImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);
      const res = await api.post("/profile/avatar", formData);
      if (res.status === 200) {
        dispatch({
          type: actions.profile.profileImageUpload,
          data: res.data.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      {state?.user?.avatar ? (
        <Img
          src={`${import.meta.env.VITE_IMAGE_BASEURL}${state?.user?.avatar}`}
          className={"rounded-full w-full h-full object-cover"}
        />
      ) : (
        <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
          {/* User's first name initial */}
          <span className="">{state?.user?.firstName?.charAt(0)}</span>
        </div>
      )}
      <form>
        <label
          className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80"
          htmlFor="avatar"
        >
          <Img src={editIcon} alt="Edit" />
        </label>
        <input type="file" name="" id="avatar" hidden onChange={uploadImage} />
      </form>
    </div>
  );
};

export default Avatar;
