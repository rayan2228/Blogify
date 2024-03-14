import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import BlogList from "../blogs/BlogList";
import Loading from "../layouts/Loading";
import NotFound from "../layouts/NotFound";
const ProfileBlogs = () => {
  const { state } = useProfile();
  const { auth } = useAuth();
  let content;
  if (state?.blogs?.length > 0) {
    content = state?.blogs?.map((blog) => (
      <BlogList key={blog.id} blog={blog} />
    ));
  } else if (state?.loading) {
    content = <Loading />;
  } else if (state?.error) {
    content = (
      <NotFound message={`an error occurred ${state?.error.message}`} />
    );
  } else {
    content = <NotFound message={"no blogs founded"} />;
  }
  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
        {state?.user?.id === auth?.user?.id
          ? "Your Blogs"
          : `${state?.user?.firstName}'s Blogs`}
      </h4>
      <div className="my-6 space-y-4">
        {/* Blog Card Start */}
        {content}
      </div>
    </>
  );
};

export default ProfileBlogs;
