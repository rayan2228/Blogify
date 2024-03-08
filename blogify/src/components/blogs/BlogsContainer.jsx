import { useEffect, useReducer, useRef, useState } from "react";
import BlogList from "./BlogList";
import { blogReducer, initialState } from "../../reducers/blog/blogReducer";
import actions from "../../reducers/actions";
import api from "../../api";
import Loading from "../layouts/Loading";
import NotFound from "../layouts/NotFound";
const BlogsContainer = () => {
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(null);
  useEffect(() => {
    dispatch({ type: actions.blogs.dataFetching });
    const fetchBlogs = async () => {
      try {
        const res = await api.get(`/blogs?page=${page}&limit=10`);
        if (res.data?.blogs?.length === 0) {
          setHasMore(false);
        } else {
          dispatch({ type: actions.blogs.dataFetched, data: res.data?.blogs });
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        dispatch({ type: actions.blogs.dataFetchedError });
      }
    };
    const onIntersection = (items) => {
      const loadItem = items[0];
      if (loadItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };
    const observer = new IntersectionObserver(onIntersection);
    if (observer && loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);
  let content;
  if (state?.blogs?.length > 0) {
    content = state?.blogs?.map((blog) => (
      <BlogList key={blog.id} blog={blog} />
    ));
  }
  if (state?.blogs?.length === 0) {
    <NotFound message={"no blog found"} />;
  }
  return (
    <div className="space-y-3 md:col-span-5">
      {content}
      {hasMore ? (
        <Loading ref={loadingRef} />
      ) : (
        <div className="p-2 text-lg text-center text-white bg-slate-900">
          all blogs are loaded
        </div>
      )}
    </div>
  );
};

export default BlogsContainer;
