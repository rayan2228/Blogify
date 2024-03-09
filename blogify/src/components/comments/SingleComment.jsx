import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import Img from "../layouts/Img";
import CommentActions from "./CommentActions";
import useAuth from "../../hooks/useAuth";

const SingleComment = ({ commentInfo }) => {
  const { state: profile } = useProfile();
  const { auth } = useAuth();
  return (
    <div className="flex items-start my-8 space-x-4">
      <Link to={`/profile/${commentInfo?.author?.id}`}>
        {commentInfo?.author?.avatar ? (
          <Img
            src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
              profile?.user?.id === commentInfo?.author?.id
                ? profile?.user?.avatar
                : commentInfo?.author?.avatar
            }`}
            className={"rounded-full w-8 h-8 object-cover"}
          />
        ) : (
          <div className="text-white bg-indigo-600 avater-img">
            <span className="">{commentInfo?.author?.firstName.charAt(0)}</span>
          </div>
        )}
      </Link>
      <div className="relative w-full">
        <h5 className="font-bold text-slate -500">
          <Link to={`/profile/${commentInfo?.author?.id}`}>
            {commentInfo?.author?.firstName}
            {commentInfo?.author?.lastName}
          </Link>
        </h5>
        <p className="text-slate-300">{commentInfo.content}</p>
        {auth?.user?.id === commentInfo?.author?.id && <CommentActions />}
      </div>
    </div>
  );
};

export default SingleComment;
