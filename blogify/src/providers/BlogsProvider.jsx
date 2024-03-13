import { BlogsContext } from "../context";
import useBlogs from "../hooks/useBlogs";

const BlogsProvider = ({ children }) => {
  const { state, dispatch } = useBlogs();
  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

export default BlogsProvider;
