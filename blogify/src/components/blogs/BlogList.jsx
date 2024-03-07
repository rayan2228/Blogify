import Img from "../layouts/Img";
import roadMap from "../../assets/blogs/React-Roadmap.jpg";
import dots3 from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
const BlogList = ({ blog }) => {
  const { state } = useProfile();
  return (
    <div className="blog-card">
      <Img
        className="blog-thumb"
        src={`${import.meta.env.VITE_IMAGE_BASEURL}/blog/${blog.thumbnail}`}
        alt={roadMap}
      />
      <div className="relative mt-2">
        <Link to="/single-blog"></Link>
        <h3 className="text-xl text-slate-300 lg:text-2xl">
          <Link to="/single-blog"></Link>
          <Link to="/single-blog">{blog.title}</Link>
        </h3>
        <p className="mt-1 mb-6 text-base text-slate-500">{blog.content}</p>
        {/* Meta Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            {blog.author?.avatar ? (
              <Img
                src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                  state?.id === blog.author?.id
                    ? state?.user?.avatar
                    : blog.author?.avatar
                }`}
                className={"rounded-full w-8 h-8 object-cover"}
              />
            ) : (
              <div className="text-white bg-indigo-600 avater-img">
                <span className="">S</span>
              </div>
            )}
            <div>
              <h5 className="text-sm text-slate-500">
                <a href="./profile.html">
                  {blog.author?.firstName} {blog.author?.lastName}
                </a>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 text-sm text-slate-700">
            <span>{blog.likes.length} Likes</span>
          </div>
        </div>
        {/* action dot */}
        <div className="absolute top-0 right-0">
          <button>
            <img src={dots3} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        </div>
        {/* action dot ends */}
      </div>
    </div>
  );
};

export default BlogList;
