import Container from "../components/layouts/Container";
import Img from "../components/layouts/Img";
import CommentsContainer from "../components/comments/CommentsContainer";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";
import actions from "../reducers/actions";
import Loading from "../components/layouts/Loading";
import NotFound from "../components/layouts/NotFound";
import useProfile from "../hooks/useProfile";
import SingleBlogActions from "../components/singleBlog/SingleBlogActions";
import getDateFormat from "../utils/getDateFormat";
import useBlogs from "../hooks/useBlogs";
import useComment from "../hooks/useComment";
import useAuth from "../hooks/useAuth";
const SingleBlog = () => {
  const { blogId } = useParams();
  const { state, dispatch } = useBlogs();
  const { state: profile } = useProfile();
  const { setComments } = useComment();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchSingleBlog = async () => {
      dispatch({ type: actions.blogs.dataFetching });
      try {
        const res = await api.get(`/blogs/${blogId}`);
        if (res.status === 200) {
          dispatch({ type: actions.blogs.singleDataFetched, data: res?.data });
          setComments(res.data.comments);
        }
      } catch (error) {
        dispatch({ type: actions.blogs.dataFetchedError, error: error });
      }
    };
    fetchSingleBlog();
  }, [blogId, dispatch]);
  let content;
  if (state?.blog) {
    content = (
      <div className="py-8 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">{state?.blog?.title}</h1>
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="flex items-center space-x-2 capitalize">
            <Link to={`/profile/${state?.blog?.author?.id}`}>
              {state?.blog.author?.avatar ||
              profile?.user?.avatar ||
              auth?.user?.avatar ? (
                <Img
                  src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                    (profile?.user?.id || auth?.user?.id) ===
                    state?.blog.author?.id
                      ? profile?.user?.avatar || auth?.user?.avatar
                      : state?.blog.author?.avatar
                  }`}
                  className={"rounded-full w-8 h-8 object-cover"}
                />
              ) : (
                <div className="text-white bg-indigo-600 avater-img">
                  <span className="">
                    {state?.blog?.author?.firstName.charAt(0)}
                  </span>
                </div>
              )}
            </Link>
            <h5 className="text-sm text-slate-500">
              <Link to={`/profile/${state?.blog?.author?.id}`}>
                {state?.blog.author?.firstName} {state?.blog.author?.lastName}
              </Link>
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {getDateFormat(state?.blog?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {state?.blog?.likes?.length} Likes
          </span>
        </div>
        {state?.blog?.thumbnail && (
          <Img
            className="object-cover w-full mx-auto md:w-8/12 h-80 md:h-96"
            src={`${import.meta.env.VITE_IMAGE_BASEURL}/blog/${
              state?.blog?.thumbnail
            }`}
            alt={state?.blog?.thumbnail}
          />
        )}
        {/* Tags */}
        <ul className="tags">
          {state?.blog?.tags?.split(",").map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {/* Content */}
        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {state?.blog?.content}
        </div>
      </div>
    );
  }
  if (state?.loading) {
    content = <Loading />;
  }
  if (state?.error) {
    content = (
      <NotFound message={`an error occurred ${state?.error.message}`} />
    );
  }
  return (
    <main>
      {/* Begin Blogs */}
      <Container>{content}</Container>
      {/* Begin Comments */}
      {state?.blog && <CommentsContainer />}
      {/* End Blogs */}

      {state?.blog && <SingleBlogActions likes={state?.blog?.likes} />}
    </main>
  );
};

export default SingleBlog;
