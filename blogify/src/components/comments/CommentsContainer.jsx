import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SingleComment from "./SingleComment";
import useProfile from "../../hooks/useProfile";
import Img from "../layouts/Img";

const CommentsContainer = ({ comments }) => {
  const { auth } = useAuth();
  const { state } = useProfile();
  return (
    <section id="comments">
      <div className="container w-full mx-auto md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">
          Comments ({comments?.length})
        </h2>
        {auth?.user ? (
          <div className="flex space-x-4 items -center">
            <Link to={`/profile/${state?.user?.id}`}>
              {auth?.user?.avatar || state?.user?.avatar ? (
                <Img
                  src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                    state?.user?.avatar ?? auth?.user?.avatar
                  }`}
                  className={"rounded-full w-8 h-8 object-cover"}
                />
              ) : (
                <div className="text-white bg-indigo-600 avater-img">
                  <span className="">{auth?.user?.firstName.charAt(0)}</span>
                </div>
              )}
            </Link>
            <div className="w-full">
              <textarea
                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                placeholder="Write a comment"
                defaultValue={""}
              />
              <div className="flex justify-end mt-4">
                <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                  Comment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 text-lg text-center text-white capitalize bg-slate-900">
            please{" "}
            <Link to={"/login"} className="text-red-500 underline">
              login
            </Link>{" "}
            to comment
          </div>
        )}
        {comments?.map((comment) => (
          <SingleComment key={comment.id} commentInfo={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentsContainer;
