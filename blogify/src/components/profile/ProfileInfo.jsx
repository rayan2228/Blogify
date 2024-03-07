import Img from "../../components/layouts/Img";
import editIcon from "../../assets/icons/edit.svg";
const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* profile image */}
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="grid w-full h-full text-5xl text-white bg-orange-600 rounded-full place-items-center">
          {/* User's first name initial */}
          <span className="">S</span>
        </div>
        <button className="absolute bottom-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80">
          <Img src={editIcon} alt="Edit" />
        </button>
      </div>
      {/* name , email */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {/* {user?.firstName} {user?.lastName} */}
        </h3>
        <p className="leading-[231%] lg:text-lg">saadhasan@gmail.com</p>
      </div>
      {/* bio */}
      <div className="flex items-start gap-2 mt-4 lg:mt-6">
        <div className="flex-1">
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            Sumit is an entrepreneurial visionary known for his exceptional
            performance and passion for technology and business. He established
            Analyzen in 2008 while he was a student at Bangladesh University of
            Engineering &amp; Technology (BUET). Analyzen has since become a
            top-tier Web and Mobile Application Development firm and the first
            Digital and Social Media Marketing Agency in Bangladesh.
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
