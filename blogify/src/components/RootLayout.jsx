import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Outlet } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";

const RootLayout = () => {
  return (
    <ProfileProvider>
      <Header />
      <Outlet />
      <Footer />
    </ProfileProvider>
  );
};

export default RootLayout;
