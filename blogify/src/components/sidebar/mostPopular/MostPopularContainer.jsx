import { useEffect, useReducer } from "react";
import MostPopularBlogList from "./MostPopularBlogList";
import { blogReducer, initialState } from "../../../reducers/blog/blogReducer";
import actions from "../../../reducers/actions";
import api from "../../../api";
import NotFound from "../../layouts/NotFound";
import Loading from "../../layouts/Loading";

const MostPopularContainer = () => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  useEffect(() => {
    dispatch({ type: actions.blogs.dataFetching });
    const fetchPopularBlogs = async () => {
      try {
        const res = await api.get(`/blogs/popular`);
        if (res.status === 200) {
          dispatch({
            type: actions.blogs.popularDataFetched,
            data: res.data?.blogs,
          });
        }
      } catch (error) {
        dispatch({ type: actions.blogs.dataFetchedError });
      }
    };
    fetchPopularBlogs();
  }, []);
  let content;
  if (state?.loading) {
    content = <Loading />;
  }
  if (state?.popularBlogs?.length) {
    content = state?.popularBlogs?.map((popularBlog) => (
      <MostPopularBlogList key={popularBlog.id} popularBlog={popularBlog} />
    ));
  }
  if (state?.blogs?.length === 0) {
    <NotFound message={"no popular blog found"} />;
  }
  if (state?.error) {
    content = <NotFound message={`an error occurred ${error.message}`} />;
  }
  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Most Popular 👍️
      </h3>
      <ul className="my-5 space-y-5">{content}</ul>
    </div>
  );
};

export default MostPopularContainer;
