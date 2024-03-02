import MostPopularBlogList from "./MostPopularBlogList";

const MostPopularContainer = () => {
  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Most Popular 👍️
      </h3>
      <ul className="my-5 space-y-5">
        <MostPopularBlogList />
      </ul>
    </div>
  );
};

export default MostPopularContainer;
