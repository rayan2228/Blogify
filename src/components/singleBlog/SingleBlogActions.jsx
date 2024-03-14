import likeIcon from "../../assets/icons/like.svg";
import likedIcon from "../../assets/icons/liked.svg";
import heartIcon from "../../assets/icons/heart.svg";
import heartFilledIcon from "../../assets/icons/heart-filled.svg";
import commentIcon from "../../assets/icons/comment.svg";
import Img from "../layouts/Img";
import LoginModal from "../../modal/LoginModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useComment from "../../hooks/useComment";

const SingleBlogActions = ({ likes }) => {
  const { auth } = useAuth();
  const { api } = useAxios();
  const { blogId } = useParams();
  const { comments } = useComment();
  const [lengths, setLengths] = useState({
    likes: likes,
  });
  const [isLiked, setIsLiked] = useState(
    lengths.likes?.some((userID) => userID.id === auth?.user?.id)
  );
  const [isFave, setIsFav] = useState();
  const { checkAuth, setShowLoginModal, showLoginModal } = useLoginModal();

  const handleLike = async () => {
    const isAuth = checkAuth();
    if (isAuth) {
      try {
        let res = await api.post(`blogs/${blogId}/like`);
        if (res.status === 200) {
          setLengths({ ...lengths, likes: res?.data?.likes });
          setIsLiked(res?.data?.isLiked);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFav = async () => {
    const isAuth = checkAuth();
    if (isAuth) {
      try {
        let res = await api.patch(`blogs/${blogId}/favourite`);
        if (res.status === 200) {
          setIsFav(res?.data?.isFavourite);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchFavBlogs = async () => {
      const res = await api.get(`/blogs/favourites`);
      try {
        if (res.status === 200) {
          setIsFav(res?.data?.blogs?.some((blog) => blog.id === blogId));
        }
      } catch (error) {
        console.log(error);
      }
    };
    setIsLiked(lengths.likes?.some((userID) => userID.id === auth?.user?.id));
    auth?.user && fetchFavBlogs();
  }, [auth, lengths.likes, api, blogId]);
  return (
    <>
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <Img src={isLiked ? likedIcon : likeIcon} alt="like" />
            <span>{lengths.likes?.length}</span>
          </li>
          <li onClick={handleFav}>
            <Img src={isFave ? heartFilledIcon : heartIcon} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <Img src={commentIcon} alt="Comments" />
              <span>{comments?.length}</span>
            </li>
          </a>
        </ul>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default SingleBlogActions;
