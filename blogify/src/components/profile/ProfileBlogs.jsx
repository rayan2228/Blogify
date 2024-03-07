import BlogList from "../blogs/BlogList";

const ProfileBlogs = () => {
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {/* Blog Card Start */}
        <BlogList />
      </div>
    </>
  );
};

export default ProfileBlogs;
