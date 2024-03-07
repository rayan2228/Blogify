import Container from "../components/layouts/Container";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import ProfileInfo from "../components/profile/ProfileInfo";
import useProfile from "../hooks/useProfile";
import actions from "../reducers/actions";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import Loading from "../components/layouts/Loading";
import useAxios from "../hooks/useAxios";
const Profile = () => {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const userId = auth?.user?.id;
  const { api } = useAxios();
  useEffect(() => {
    dispatch({ type: actions.profile.dataFetching });
    const fetchProfileData = async () => {
      try {
        const res = await api.get(`/profile/${userId}`);
        if (res.status === 200) {
          dispatch({ type: actions.profile.dataFetched, data: res.data });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.dataFetchedError,
          data: error.message,
        });
      }
    };
    fetchProfileData();
  }, [userId, dispatch]);
  if (state?.loading) {
    return <Loading />;
  }
  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <Container>
        <ProfileInfo />
        <ProfileBlogs />
      </Container>
    </main>
  );
};

export default Profile;
