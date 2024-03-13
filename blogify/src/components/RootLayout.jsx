import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Outlet } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <ProfileProvider>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </ProfileProvider>
  );
};

export default RootLayout;
