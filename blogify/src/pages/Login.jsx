import Container from "../components/layouts/Container";
import LoginUI from "../components/loginUI/LoginUI";

const Login = () => {
  return (
    <main>
      <Container>
        {/* Login Form into a box center of the page */}
        <LoginUI />
      </Container>
    </main>
  );
};

export default Login;
