import Container from "../components/layouts/Container";
import BlogList from "../components/blogs/BlogList";
import { useEffect } from "react";
import api from "../api";
import useAuth from "../hooks/useAuth";
import ProfileInfo from "../components/profile/ProfileInfo";
import useUser from "../hooks/useUser";
const Profile = () => {
  const { auth } = useAuth();
  const { setUser } = useUser();
  const userId = auth?.user?.id;
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get(`/profile/${userId}`);
        setUser(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, [userId, setUser]);

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <Container>
        {/* profile info */}
        <ProfileInfo />
        {/* end profile info */}
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {/* Blog Card Start */}
          <BlogList />
        </div>
      </Container>
    </main>
  );
};

export default Profile;
