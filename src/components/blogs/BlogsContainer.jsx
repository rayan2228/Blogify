import { useEffect, useRef, useState } from "react";
import BlogList from "./BlogList";
import actions from "../../reducers/actions";
import api from "../../api";
import Loading from "../layouts/Loading";
import NotFound from "../layouts/NotFound";
import useBlogs from "../../hooks/useBlogs";
const BlogsContainer = () => {
  const { state, dispatch } = useBlogs();
  const [page, setPage] = useState(1);
  const loadingRef = useRef(null);
  const fetchBlogs = async () => {
    try {
      const res = await api.get(`/blogs?page=${page}&limit=5`);
      if (res.data?.blogs?.length === 0) {
        dispatch({ type: actions.blogs.dataFetched, data: res.data?.blogs });
        dispatch({
          type: actions.blogs.stopDataFetched,
          data: false,
        });
      } else {
        console.log(res.data?.blogs);
        dispatch({ type: actions.blogs.dataFetched, data: res.data?.blogs });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      dispatch({
        type: actions.blogs.dataFetchedError,
        error: error,
      });
    }
  };
  useEffect(() => {
    const onIntersection = (items) => {
      const loadItem = items[0];
      if (loadItem.isIntersecting && state.hasMore) {
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
  }, [state.hasMore, page]);
  let content;
  if (state?.blogs?.length > 0) {
    content = state?.blogs?.map((blog) => (
      <BlogList key={blog.id} blog={blog} />
    ));
  }
  if (state?.blogs?.length === 0) {
    content = <NotFound message={"no blog found"} />;
  }
  if (state?.error) {
    content = (
      <NotFound message={`an error occurred ${state?.error.message}`} />
    );
  }
  return (
    <div className="space-y-3 md:col-span-5">
      {content}
      {state.hasMore && !state?.error ? (
        <Loading ref={loadingRef} />
      ) : (
        !state?.error &&
        state?.blogs?.length !== 0 && (
          <div className="p-2 text-lg text-center text-white bg-slate-900">
            all blogs are loaded
          </div>
        )
      )}
    </div>
  );
};

export default BlogsContainer;
