import { Link } from "react-router-dom";

const YourFavouriteBlogList = ({ favouriteBlog }) => {
  return (
    <li>
      <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
        <Link to={`/single-blog/${favouriteBlog.id}`}>
          {favouriteBlog.title}
        </Link>
      </h3>
      <ul className="flex gap-x-2">
        {favouriteBlog?.tags?.split(",")?.map((tag, index) => (
          <li className="text-sm text-slate-600" key={index}>
            # {tag}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default YourFavouriteBlogList;
