import YourFavouriteBlogList from "./YourFavouriteBlogList";

const YourFavoritesContainer = () => {
  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favorites ❤️
      </h3>
      <ul className="my-5 space-y-5">
        <YourFavouriteBlogList />
      </ul>
    </div>
  );
};

export default YourFavoritesContainer;
