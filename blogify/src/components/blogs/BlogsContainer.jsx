import { useEffect, useReducer } from "react";
import BlogList from "./BlogList";
import { blogReducer } from "../../reducers/blog/blogReducer";
import { initialState } from "../../reducers/profile/profileReducer";
import actions from "../../reducers/actions";
import api from "../../api";
import Loading from "../layouts/Loading";
import NotFound from "../layouts/NotFound";
const BlogsContainer = () => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  useEffect(() => {
    dispatch({ type: actions.blogs.dataFetching });
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        dispatch({ type: actions.blogs.dataFetched, data: res.data });
      } catch (error) {
        dispatch({ type: actions.blogs.dataFetchedError });
      }
    };
    fetchBlogs();
  }, []);
  let content;
  if (state?.blogs?.blogs?.length > 0) {
    content = state?.blogs?.blogs?.map((blog) => (
      <BlogList key={blog.id} blog={blog} />
    ));
  }
  if (state?.loading) {
    content = <Loading />;
  }
  if (state?.blogs?.blogs?.length === 0) {
    content = <NotFound message="no blogs" />;
  }

  return (
    <div className="space-y-3 md:col-span-5">
      {/* Blog Card Start */}
      {content}
    </div>
  );
};

export default BlogsContainer;
