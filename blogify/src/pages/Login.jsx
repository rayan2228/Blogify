import { Link, useNavigate } from "react-router-dom";
import Container from "../components/layouts/Container";
import { useForm } from "react-hook-form";
import InputField from "../components/layouts/InputField";
import axios from "axios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const formSubmit = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}auth/login`,
        formData
      );
      if (res.status === 200) {
        const { token, user } = res.data;
        if (token) {
          const { accessToken, refreshToken } = token;
          setAuth({ user, accessToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error.response?.data?.error,
      });
    }
  };
  return (
    <main>
      <Container>
        {/* Login Form into a box center of the page */}
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Login</h2>
          {errors.root?.random?.message && (
            <div
              className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <span className="block sm:inline">
                {errors.root?.random?.message}
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() =>
                  setError("root.random", {
                    type: "random",
                    message: "",
                  })
                }
              >
                <svg
                  className="w-6 h-6 text-red-500 fill-current"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            <InputField
              className={"mb-6"}
              labelClassName="block mb-2"
              label={"email"}
              error={errors.email}
            >
              <input
                {...register("email", { required: "email is required" })}
                type="email"
                id="email"
                name="email"
                className={`w-full p-3 bg-[#030317] border ${
                  !!errors.email ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </InputField>
            <InputField
              className={"mb-6"}
              labelClassName="block mb-2"
              label={"password"}
              error={errors.password}
            >
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "your password must be at least 8 characters",
                  },
                })}
                type="password"
                id="password"
                name="password"
                className={`w-full p-3 bg-[#030317] border ${
                  !!errors.firstName ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </InputField>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Login;
