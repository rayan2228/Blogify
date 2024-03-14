import Img from "../layouts/Img";
import { Link, useNavigate } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import BlogActions from "./BlogActions";
import useAuth from "../../hooks/useAuth";
import getDateFormat from "../../utils/getDateFormat";
const BlogList = ({ blog }) => {
  const { state } = useProfile();
  const { auth } = useAuth();
  return (
    <Link className="blog-card" to={`/single-blog/${blog?.id}`}>
      {blog?.thumbnail && (
        // <Link to={`/single-blog/${blog?.id}`}>
        <Img
          className="blog-thumb"
          src={`${import.meta.env.VITE_IMAGE_BASEURL}blog/${blog.thumbnail}`}
          alt={blog.thumbnail}
        />
        // </Link>
      )}
      <div className="relative mt-2">
        {/* <Link to={`/single-blog/${blog?.id}`}> */}
        <h3 className="text-xl text-slate-300 lg:text-2xl">{blog.title}</h3>
        {/* </Link> */}
        {/* <Link to={`/single-blog/${blog?.id}`}> */}
        <p className="mt-1 mb-6 text-base text-slate-500">
          {`${blog.content.slice(0, 180)} ...`}
        </p>
        {/* </Link> */}
        {/* Meta Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            <Link to={`/profile/${blog?.author?.id}`}>
              {blog.author?.avatar ? (
                <Img
                  src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                    state?.user?.id === blog.author?.id
                      ? state?.user?.avatar
                      : blog.author?.avatar
                  }`}
                  className={"rounded-full w-8 h-8 object-cover"}
                />
              ) : (
                <div className="text-white bg-indigo-600 avater-img">
                  <span className="">{blog?.author?.firstName.charAt(0)}</span>
                </div>
              )}
            </Link>
            <div>
              <h5 className="text-sm text-slate-500">
                <Link to={`/profile/${blog?.author?.id}`}>
                  {blog.author?.firstName} {blog.author?.lastName}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{getDateFormat(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 text-sm text-slate-700">
            <span>{blog.likes.length} Likes</span>
          </div>
        </div>
        {/* action dot */}
        {auth?.user?.id === blog.author?.id && (
          <BlogActions blogDetails={blog} />
        )}
        {/* action dot ends */}
      </div>
    </Link>
  );
};

export default BlogList;
