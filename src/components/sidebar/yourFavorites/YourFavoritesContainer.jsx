import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import YourFavouriteBlogList from "./YourFavouriteBlogList";
import { useEffect } from "react";
import actions from "../../../reducers/actions";
import useAxios from "../../../hooks/useAxios";
import NotFound from "../../layouts/NotFound";
import Loading from "../../layouts/Loading";
import useBlogs from "../../../hooks/useBlogs";

const YourFavoritesContainer = () => {
  const { auth } = useAuth();
  const { state, dispatch } = useBlogs();
  const { api } = useAxios();
  useEffect(() => {
    dispatch({ type: actions.blogs.dataFetching });
    const fetchFavouritesBlogs = async () => {
      try {
        if (auth) {
          const res = await api.get(`/blogs/favourites`);
          if (res?.status === 200) {
            dispatch({
              type: actions.blogs.favouriteDataFetched,
              data: res.data?.blogs,
            });
          }
        }
      } catch (error) {
        dispatch({ type: actions.blogs.dataFetchedError, error: error });
      }
    };
    auth?.user && fetchFavouritesBlogs();
  }, [api, auth?.user]);
  let content;
  if (state?.loading) {
    content = <Loading />;
  }
  if (state?.favouriteBlogs?.length === 0) {
    content = <NotFound message={"not added yet"} />;
  }
  if (state?.favouriteBlogs?.length > 0) {
    console.log("yee");
    content = state?.favouriteBlogs?.map(() => (
      <YourFavouriteBlogList
        key={favouriteBlog.id}
        favouriteBlog={favouriteBlog}
      />
    ));
  }
  if (state?.error) {
    content = (
      <NotFound message={`an error occurred ${state?.error.message}`} />
    );
  }
  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favorites ❤️
      </h3>
      <ul className="my-5 space-y-5">
        {auth?.user ? (
          [content]
        ) : (
          <div className="p-2 text-lg text-center text-white capitalize bg-slate-900">
            please{" "}
            <Link to={"/login"} className="text-red-500 underline">
              login
            </Link>{" "}
            to see your Favorite blogs
          </div>
        )}
      </ul>
    </div>
  );
};

export default YourFavoritesContainer;
