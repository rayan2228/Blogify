import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import SingleBlog from "./pages/SingleBlog";
import BlogWrite from "./pages/BlogWrite";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/single-blog" element={<SingleBlog />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog-write" element={<BlogWrite />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
