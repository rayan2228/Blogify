import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SingleComment from "./SingleComment";
import useProfile from "../../hooks/useProfile";
import Img from "../layouts/Img";
import { useForm } from "react-hook-form";
import InputField from "../layouts/InputField";
import useAxios from "../../hooks/useAxios";
import LoginModal from "../../modal/LoginModal";
import useLoginModal from "../../hooks/useLoginModal";
import useComment from "../../hooks/useComment";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import Spinner from "../layouts/Spinner";
import pageScroll from "../../utils/pageScroll";
const CommentsContainer = () => {
  const { comments, setComments } = useComment();
  const [spinner, setSpinner] = useState(false);
  const { setShowLoginModal, showLoginModal } = useLoginModal();
  const { blogId } = useParams();
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm();
  const { api } = useAxios();
  const formSubmit = async (formData) => {
    setSpinner(true);
    try {
      const res = await api.post(`/blogs/${blogId}/comment`, {
        content: formData.comment,
      });
      if (res?.status === 200) {
        pageScroll(document.body.offsetHeight);
        toast.success("comment successfully done", {
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
        setComments(res?.data?.comments);
        reset();
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error.response?.data?.error,
      });
    } finally {
      setSpinner(false);
    }
  };
  return (
    <section id="comments">
      <div className="container w-full mx-auto md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">
          Comments ({comments?.length ?? 0})
        </h2>
        {auth?.user ? (
          <div className="flex space-x-4 items -center">
            <Link to={`/profile/${profile?.user?.id}`}>
              {auth?.user?.avatar || profile?.user?.avatar ? (
                <Img
                  src={`${import.meta.env.VITE_IMAGE_BASEURL}/avatar/${
                    profile?.user?.avatar ?? auth?.user?.avatar
                  }`}
                  className={"rounded-full w-8 h-8 object-cover"}
                />
              ) : (
                <div className="text-white bg-indigo-600 avater-img">
                  <span className="">{auth?.user?.firstName.charAt(0)}</span>
                </div>
              )}
            </Link>
            <div className="w-full">
              {errors.root?.random?.message && (
                <div
                  className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
                  role="alert"
                >
                  <span className="block sm:inline">
                    {errors.root?.random?.message}
                  </span>
                  <span
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() =>
                      setError("root.random", {
                        type: "random",
                        message: "",
                      })
                    }
                  >
                    <svg
                      className="w-6 h-6 text-red-500 fill-current"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </span>
                </div>
              )}
              <form onSubmit={handleSubmit(formSubmit)}>
                <InputField error={errors.comment}>
                  <textarea
                    {...register("comment", {
                      required: "comment is required",
                    })}
                    className={`w-full bg-[#030317] border ${
                      !!errors.comment ? "border-red-500" : "border-slate-500"
                    }text-slate-300 p-4 rounded-md focus:outline-none`}
                    placeholder="Write a comment"
                    name="comment"
                    defaultValue={""}
                  />
                </InputField>
                <div className="flex justify-end mt-4">
                  {spinner ? (
                    <span className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                      <Spinner />
                    </span>
                  ) : (
                    <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                      Comment
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="p-2 text-lg text-center text-white capitalize bg-slate-900">
              please{" "}
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={() => setShowLoginModal(true)}
              >
                login
              </span>{" "}
              to comment
            </div>
            {showLoginModal && (
              <LoginModal onClose={() => setShowLoginModal(false)} />
            )}
          </>
        )}
        {comments?.map((comment) => (
          <SingleComment key={comment.id} commentInfo={comment} />
        ))}
      </div>
    </section>
  );
};

export default CommentsContainer;
