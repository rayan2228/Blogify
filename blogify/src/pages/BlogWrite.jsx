import { useForm } from "react-hook-form";
import InputField from "../components/layouts/InputField";
import { useState } from "react";
import Img from "../components/layouts/Img";

const BlogWrite = () => {
  const [preview, setPreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = async (formData) => {
    console.log(formData);
  };
  return (
    <main>
      <section>
        <div className="container">
          {/* Form Input field for creating Blog Post */}
          <form onSubmit={handleSubmit(formSubmit)} className="createBlog">
            {preview && (
              <div className="w-full border border-indigo-500 h-80 bg-slate-600/20">
                <Img
                  src={preview}
                  alt={preview}
                  className={"w-full h-full object-contain"}
                />
              </div>
            )}
            <InputField className={"mb-6"} error={errors.file}>
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
                  <label htmlFor="file">Upload Your Image</label>
                </div>
                <input
                  {...register("file", {
                    onChange: (e) =>
                      setPreview(URL.createObjectURL(e.target.files[0])),
                  })}
                  type="file"
                  id="file"
                  name="file"
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
              />
            </InputField>
            <InputField className={"mb-6"} error={errors.tags}>
              <input
                {...register("tags", { required: "tags is required" })}
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
            </InputField>
            <InputField className={"mb-6"} error={errors.content}>
              <textarea
                {...register("content", { required: "content is required" })}
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows={8}
                defaultValue={""}
              />
            </InputField>
            <div className="mb-6"></div>
            <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
              Create Blog
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default BlogWrite;
