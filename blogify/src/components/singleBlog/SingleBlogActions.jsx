import likeIcon from "../../assets/icons/like.svg";
import heartIcon from "../../assets/icons/heart.svg";
import commentIcon from "../../assets/icons/comment.svg";
import Img from "../layouts/Img";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import LoginModal from "../../modal/LoginModal";

const SingleBlogActions = () => {
  const [showLoginModal, setShowLoginBlog] = useState(false);
  const { auth } = useAuth();
  const checkAuth = () => {
    if (!auth?.user) {
      setShowLoginBlog(true);
    }
  };
  const handleLike = () => {
    checkAuth();
  };
  useEffect(() => {
    if (auth?.user) {
      setShowLoginBlog(false);
    }
  }, [auth]);
  return (
    <>
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <Img src={likeIcon} alt="like" />
            <span>10</span>
          </li>
          <li>
            {/* There is heart-filled.svg in the icons folder */}
            <Img src={heartIcon} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <Img src={commentIcon} alt="Comments" />
              <span>3</span>
            </li>
          </a>
        </ul>
      </div>
      {showLoginModal && <LoginModal onClose={() => setShowLoginBlog(false)} />}
    </>
  );
};

export default SingleBlogActions;
