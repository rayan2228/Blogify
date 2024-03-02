import Sidebar from "../components/Sidebar";
import BlogsContainer from "../components/blogs/BlogsContainer";
import Container from "../components/layouts/Container";

const Home = () => {
  return (
    <main>
      {/* Begin Blogs */}
      <section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            {/* Blog Contents */}
            <BlogsContainer />
            {/* Sidebar */}
            <Sidebar />
          </div>
        </Container>
      </section>
      {/* End Blogs */}
    </main>
  );
};

export default Home;
