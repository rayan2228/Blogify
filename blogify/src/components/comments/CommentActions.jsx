import { useParams } from "react-router-dom";
import dots3 from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import useAxios from "../../hooks/useAxios";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import Img from "../layouts/Img";
import { useState } from "react";
const CommentActions = ({ commentId }) => {
  const { blogId } = useParams();
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { api } = useAxios();
  const handleDeleteComment = async (Id) => {
    try {
      const res = await api.delete(`/blogs/${blogId}/comment/${Id}`);
      if (res.status === 200) {
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute top-0 right-0">
      <button onClick={() => setShowCommentActions(!showCommentActions)}>
        <Img src={dots3} alt="3dots of Action" />
      </button>
      {/* Action Menus Popup */}
      {showCommentActions && (
        <div className="action-modal-container">
          <button
            className="action-menu-item hover:text-red-500"
            onClick={() => setShowDeleteModal(true)}
          >
            <Img src={deleteIcon} alt="Delete" />
            Delete
          </button>
          {showDeleteModal && (
            <DeleteConfirmationModal
              onClose={() => setShowDeleteModal(false)}
              onConfirm={() => handleDeleteComment(commentId)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentActions;
