import YourFavoritesContainer from "./sidebar/yourFavorites/YourFavoritesContainer";
import MostPopularContainer from "./sidebar/mostPopular/MostPopularContainer";

const Sidebar = () => {
  return (
    <div className="w-full h-full space-y-5 md:col-span-2">
      <MostPopularContainer />
      <YourFavoritesContainer />
    </div>
  );
};

export default Sidebar;
