import { useReducer, useState } from "react";
import SearchResult from "../search/SearchResult";
import { blogReducer, initialState } from "../../reducers/blog/blogReducer";
import actions from "../../reducers/actions";
import api from "../../api";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../layouts/Loading";
import { useEffect } from "react";
import NotFound from "../layouts/NotFound";
const SearchWrapper = () => {
  const [searchTerms, setSearchTerms] = useState("");
  const [state, dispatch] = useReducer(blogReducer, initialState);
  const searchBlogs = async (searchTerms) => {
    let lowerCaseSearchTerms = searchTerms.toLowerCase();
    try {
      let res = await api.get(`search?q=${lowerCaseSearchTerms}`);
      if (res.status === 200) {
        dispatch({
          type: actions.blogs.searchedBlogsDataFetched,
          data: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.blogs.dataFetchedError,
        error: error,
      });
    }
  };
  const handleSearch = useDebounce(() => {
    searchBlogs(searchTerms);
  }, 1000);
  useEffect(() => {
    if (searchTerms) {
      dispatch({ type: actions.blogs.dataFetching });
      handleSearch();
    }
  }, [searchTerms]);
  let content;
  if (state?.loading) {
    content = <Loading />;
  }
  if (state?.searchedBlogs?.length > 0) {
    content = state?.searchedBlogs?.map((blog) => (
      <SearchResult key={blog?.id} blog={blog} onClose={onclose} />
    ));
  }
  if (state?.error) {
    content = (
      <NotFound message={`an error occurred ${state?.error.message}`} />
    );
  }
  if (state?.error && searchTerms) {
    content = <NotFound message={`no blog found`} />;
  }
  return (
    <>
      <div>
        <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
          Search for Your Desire Blogs
        </h3>
        <input
          type="text"
          // placeholder="Start Typing to Search"
          className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
          value={searchTerms}
          onChange={(e) => {
            setSearchTerms(e.target.value);
          }}
        />
      </div>
      {/* Search Result */}
      <div className="">
        <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
        <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
          {content}
        </div>
      </div>
    </>
  );
};

export default SearchWrapper;
