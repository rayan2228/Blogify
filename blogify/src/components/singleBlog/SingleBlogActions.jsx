import likeIcon from "../../assets/icons/like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import commentIcon from "../../assets/icons/comment.svg";
import Img from "../layouts/Img";
import LoginModal from "../../modal/LoginModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useState } from "react";

const SingleBlogActions = ({ likes, comments }) => {
  const [lengths, setLengths] = useState({
    likesLength: likes?.length,
    commentsLength: comments?.length,
  });
  const { checkAuth, setShowLoginModal, showLoginModal } = useLoginModal();
  const handleLike = () => {
    checkAuth();
  };
  return (
    <>
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <Img src={likeIcon} alt="like" />
            <span>{lengths.likesLength}</span>
          </li>
          <li>
            {/* There is heart-filled.svg in the icons folder */}
            <Img src={heartIcon} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <Img src={commentIcon} alt="Comments" />
              <span>{lengths.commentsLength}</span>
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
