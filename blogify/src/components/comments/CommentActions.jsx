import dots3 from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import Img from "../layouts/Img";
import { useState } from "react";
const CommentActions = () => {
  const [showCommentActions, setShowCommentActions] = useState(false);
  return (
    <div className="absolute top-0 right-0">
      <button onClick={() => setShowCommentActions(!showCommentActions)}>
        <Img src={dots3} alt="3dots of Action" />
      </button>
      {/* Action Menus Popup */}
      {showCommentActions && (
        <div className="action-modal-container">
          <button className="action-menu-item hover:text-red-500">
            <Img src={deleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentActions;
