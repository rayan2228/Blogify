import Container from "../components/layouts/Container";
import { useEffect } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import useProfile from "../hooks/useProfile";
import actions from "../reducers/actions";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import Loading from "../components/layouts/Loading";
import { useParams } from "react-router-dom";
import NotFound from "../components/layouts/NotFound";
import api from "../api";
const Profile = () => {
  const { userId } = useParams();
  const { state, dispatch } = useProfile();
  useEffect(() => {
    dispatch({ type: actions.profile.dataFetching });
    const fetchProfileData = async () => {
      try {
        const res = await api.get(`/profile/${userId}`);
        if (res?.status === 200) {
          dispatch({ type: actions.profile.dataFetched, data: res.data });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.dataFetchedError,
          data: error,
        });
      }
    };
    fetchProfileData();
  }, [userId, dispatch, api]);
  if (state?.loading) {
    return <Loading />;
  }
  if (state?.error === undefined) {
    return <NotFound message={`no user found`} />;
  }
  if (state?.error) {
    return <NotFound message={`an error occurred ${state?.error?.message}`} />;
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
