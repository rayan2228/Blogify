import React from "react";
import SingleComment from "./SingleComment";

const CommentsContainer = () => {
  return (
    <section id="comments">
      <div className="container w-full mx-auto md:w-10/12">
        <h2 className="my-8 text-3xl font-bold">Comments (3)</h2>
        <div className="flex space-x-4 items -center">
          <div className="text-white bg-indigo-600 avater-img">
            <span className="">S</span>
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              defaultValue={""}
            />
            <div className="flex justify-end mt-4">
              <button className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700">
                Comment
              </button>
            </div>
          </div>
        </div>
        <SingleComment />
      </div>
    </section>
  );
};

export default CommentsContainer;
