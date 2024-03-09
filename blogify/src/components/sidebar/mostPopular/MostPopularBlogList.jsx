import { Link } from "react-router-dom";

const MostPopularBlogList = ({ popularBlog }) => {
  return (
    <li>
      <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
        <Link to={`/single-blog/${popularBlog.id}`}>{popularBlog.title}</Link>
      </h3>
      <p className="text-sm text-slate-600">
        by
        <Link to={`/profile/${popularBlog?.author?.id}`}>
          {popularBlog?.author?.firstName}
          {popularBlog?.author?.lastName}
        </Link>
        <span>·</span> {popularBlog?.likes?.length} Likes
      </p>
    </li>
  );
};

export default MostPopularBlogList;
