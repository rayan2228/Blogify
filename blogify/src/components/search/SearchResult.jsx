import { useNavigate } from "react-router-dom";
import Img from "../layouts/Img";

const SearchResult = ({ blog, onClose }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-6 py-2 cursor-pointer"
      onClick={() => {
        navigate(`/single-blog/${blog?.id}`), onClose();
      }}
    >
      <Img
        className="object-contain h-28"
        src={`${import.meta.env.VITE_IMAGE_BASEURL}/blog/${blog?.thumbnail}`}
        alt={blog?.title}
      />
      <div className="mt-2">
        <h3 className="text-xl font-bold text-slate-300">{blog?.title}</h3>
        {/* Meta Informations */}
        <p className="mt-1 mb-6 text-sm text-slate-500">
          {blog?.content?.slice(0, 150)}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
