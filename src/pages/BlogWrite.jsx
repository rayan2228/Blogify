import { useForm } from "react-hook-form";
import InputField from "../components/layouts/InputField";
import { useState } from "react";
import Img from "../components/layouts/Img";
import useAxios from "../hooks/useAxios";
import { useLocation } from "react-router-dom";
import Spinner from "../components/layouts/Spinner";
import { toast, Bounce } from "react-toastify";
const BlogWrite = () => {
  const { state } = useLocation();
  const [blog, setBlog] = useState(state?.blogDetails || null);
  const [preview, setPreview] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const { api } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const formSubmit = async (formData) => {
    const createFormData = new FormData();
    createFormData.append("title", formData?.title);
    createFormData.append("tags", formData?.tags);
    createFormData.append("content", formData?.content);
    if (formData.thumbnail.length > 0) {
      createFormData.append("thumbnail", formData?.thumbnail[0]);
    }
    try {
      setSpinner(true);
      let res;
      if (blog) {
        res = await api.patch(`/blogs/${blog?.id}`, createFormData);
      } else {
        res = await api.post("/blogs", createFormData);
      }
      if (res.status === 201) {
        setPreview(null);
        reset();
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
      } else if (res.status === 200) {
        setBlog(res?.data);
        toast.success("blog updated successfully", {
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
    } finally {
      setSpinner(false);
    }
  };
  return (
    <main>
      <section>
        <div className="container">
          {/* Form Input field for creating Blog Post */}
          <form onSubmit={handleSubmit(formSubmit)} className="createBlog">
            {preview ? (
              <div className="w-full border border-indigo-500 h-80 bg-slate-600/20">
                <Img
                  src={preview}
                  alt={preview}
                  className={"w-full h-full object-contain"}
                />
              </div>
            ) : (
              blog?.thumbnail && (
                <div className="w-full border border-indigo-500 h-80 bg-slate-600/20">
                  <Img
                    src={`${import.meta.env.VITE_IMAGE_BASEURL}blog/${
                      blog?.thumbnail
                    }`}
                    alt={preview}
                    className={"w-full h-full object-contain"}
                  />
                </div>
              )
            )}
            <InputField className={"mb-6"} error={errors.thumbnail}>
              <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                <div className="flex items-center gap-4 transition-all cursor-pointer hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <label htmlFor="thumbnail">Upload Your Image</label>
                </div>
                <input
                  {...register("thumbnail", {
                    onChange: (e) =>
                      setPreview(URL.createObjectURL(e.target.files[0])),
                  })}
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  className="hidden"
                />
              </div>
            </InputField>
            <InputField className={"mb-6"} error={errors.title}>
              <input
                {...register("title", { required: "title is required" })}
                type="text"
                id="title"
                name="title"
                placeholder="Enter your blog title"
                defaultValue={blog?.title || ""}
              />
            </InputField>
            <InputField className={"mb-6"} error={errors.tags}>
              <input
                {...register("tags", { required: "tags is required" })}
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                defaultValue={blog?.tags || ""}
              />
            </InputField>
            <InputField className={"mb-6"} error={errors.content}>
              <textarea
                {...register("content", { required: "content is required" })}
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows={8}
                defaultValue={blog?.content || ""}
              />
            </InputField>
            <div className="mb-6"></div>
            {spinner ? (
              <span className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                <Spinner />
              </span>
            ) : (
              <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                {blog ? "Edit Blog" : "Create Blog"}
              </button>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default BlogWrite;
