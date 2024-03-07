import Img from "../../components/layouts/Img";
import editIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";
const ProfileInfo = () => {
  const { state } = useProfile();
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* profile image */}
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
          {/* User's first name initial */}
          <span className="">{state?.user?.firstName?.charAt(0)}</span>
        </div>
        <button className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80">
          <Img src={editIcon} alt="Edit" />
        </button>
      </div>
      {/* name , email */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {state?.user?.firstName} {state?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{state?.user?.email}</p>
      </div>
      {/* bio */}
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio ? state?.user?.bio : "add your bio"}
          </p>
        </div>
        {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
        <button className="rounded-full flex-center h-7 w-7">
          <Img src={editIcon} alt="Edit" />
        </button>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </div>
  );
};

export default ProfileInfo;
