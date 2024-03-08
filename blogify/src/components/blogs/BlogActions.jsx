import dots3 from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import Img from "../layouts/Img";
const BlogActions = () => {
  const [showBlogActions, setShowBlogActions] = useState(false);
  return (
    <div className="absolute top-0 right-0">
      <button onClick={() => setShowBlogActions(!showBlogActions)}>
        <Img src={dots3} alt="3dots of Action" />
      </button>
      {/* Action Menus Popup */}
      {showBlogActions && (
        <div className="action-modal-container">
          <button className="action-menu-item hover:text-lwsGreen">
            <Img src={editIcon} alt="Edit" />
            Edit
          </button>
          <button className="action-menu-item hover:text-red-500">
            <Img src={deleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogActions;
