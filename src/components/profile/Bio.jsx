import { useState } from "react";
import okIcon from "../../assets/icons/ok.svg";
import Img from "../layouts/Img";
import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";
import actions from "../../reducers/actions";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
const Bio = () => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { state, dispatch } = useProfile();
  const [showBioEdit, setShowBioEdit] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);
  const handleEditBio = () => {
    setShowBioEdit(true);
  };
  const handleUpdateBio = async () => {
    dispatch({ type: actions.profile.dataFetching });
    try {
      const res = await api.patch(`/profile/`, { bio });
      if (res?.status === 200) {
        dispatch({
          type: actions.profile.profileDataEdit,
          data: res.data.user,
        });
      }
      setShowBioEdit(false);
    } catch (error) {
      dispatch({
        type: actions.profile.dataFetchedError,
        data: error,
      });
    }
  };
  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          {showBioEdit ? (
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none resize-none"
              placeholder="Write your bio"
              defaultValue={bio}
              cols={60}
              rows={5}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.bio
                ? state?.user?.bio
                : state?.user?.id === auth?.user?.id && "add your bio"}
            </p>
          )}
        </div>
        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
        {showBioEdit ? (
          <button
            className="flex items-center justify-center rounded-full w-7 h-7 bg-slate-700 hover:bg-slate-700/80"
            onClick={handleUpdateBio}
          >
            <Img src={okIcon} alt="Ok" />
          </button>
        ) : (
          state?.user?.id === auth?.user?.id && (
            <button
              className="flex items-center justify-center rounded-full w-7 h-7 bg-slate-700 hover:bg-slate-700/80"
              onClick={handleEditBio}
            >
              <Img src={editIcon} alt="Edit" />
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Bio;
