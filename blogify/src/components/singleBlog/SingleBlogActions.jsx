import likeIcon from "../../assets/icons/like.svg";
import likedIcon from "../../assets/icons/liked.svg";
import heartIcon from "../../assets/icons/heart.svg";
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
  const { checkAuth, setShowLoginModal, showLoginModal } = useLoginModal();
  const handleLike = async () => {
    const isAuth = checkAuth();
    if (isAuth) {
      try {
        let res = await api.post(`blogs/${blogId}/like`);
        setLengths({ ...lengths, likes: res?.data?.likes });
        setIsLiked(res?.data?.isLiked);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    setIsLiked(lengths.likes?.some((userID) => userID.id === auth?.user?.id));
  }, [auth, lengths.likes]);
  return (
    <>
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <Img src={isLiked ? likedIcon : likeIcon} alt="like" />
            <span>{lengths.likes?.length}</span>
          </li>
          <li>
            {/* There is heart-filled.svg in the icons folder */}
            <Img src={heartIcon} alt="Favourite" />
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
