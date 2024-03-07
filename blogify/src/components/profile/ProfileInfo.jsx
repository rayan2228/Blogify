import Bio from "./Bio";
import Avatar from "./Avatar";
const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* profile image */}
      <Avatar />
      <Bio />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </div>
  );
};

export default ProfileInfo;
