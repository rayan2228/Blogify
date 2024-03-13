import dots3 from "../../assets/icons/3dots.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { useState } from "react";
import Img from "../layouts/Img";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../modal/DeleteConfirmationModal";
import useAxios from "../../hooks/useAxios";
import useBlogs from "../../hooks/useBlogs";
import actions from "../../reducers/actions";
import useProfile from "../../hooks/useProfile";
import { toast, Bounce } from "react-toastify";
const BlogActions = ({ blogDetails }) => {
  const { dispatch } = useBlogs();
  const { dispatch: dispatchProfile } = useProfile();
  const [showBlogActions, setShowBlogActions] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { api } = useAxios();
  const handleDeleteBlog = async (Id) => {
    try {
      const res = await api.delete(`/blogs/${Id}`);
      if (res.status === 200) {
        dispatch({ type: actions.blogs.deleteBlog, data: Id });
        dispatchProfile({ type: actions.profile.deleteBlog, data: Id });
        setShowDeleteModal(false);
        toast.success(res?.data?.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute top-0 right-0">
      <button onClick={() => setShowBlogActions(!showBlogActions)}>
        <Img src={dots3} alt="3dots of Action" />
      </button>
      {/* Action Menus Popup */}
      {showBlogActions && (
        <div className="action-modal-container">
          <button
            className="action-menu-item hover:text-lwsGreen"
            onClick={() => navigate("/blog-write", { state: { blogDetails } })}
          >
            <Img src={editIcon} alt="Edit" />
            Edit
          </button>
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
              onConfirm={() => handleDeleteBlog(blogDetails?.id)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BlogActions;
