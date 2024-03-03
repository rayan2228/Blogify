import Container from "../components/layouts/Container";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/layouts/InputField";
import { useForm } from "react-hook-form";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (formData) => {
    console.log(formData);
    navigate("/login");
  };
  return (
    <main>
      <Container>
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Register</h2>
          <form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
            <InputField
              className={"mb-6"}
              htmlFor="firstName"
              labelClassName="block mb-2"
              label={"First Name"}
              error={errors.firstName}
            >
              <input
                {...register("firstName", {
                  required: "first name is required",
                })}
                type="text"
                id="firstName"
                name="firstName"
                className={`w-full p-3 bg-[#030317] border ${
                  !!errors.firstName ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </InputField>
            <InputField
              className={"mb-6"}
              htmlFor="lastName"
              labelClassName="block mb-2"
              label={"Last Name"}
              error={errors.lastName}
            >
              <input
                {...register("lastName", { required: "last name is required" })}
                type="text"
                id="lastName"
                name="lastName"
                className={`w-full p-3 bg-[#030317] border ${
                  !!errors.lastName ? "border-red-500" : "border-white/20"
                } rounded-md focus:outline-none focus:border-indigo-500`}
              />
            </InputField>
            <InputField
              className={"mb-6"}
              labelClassName="block mb-2"
              label={"email"}
              error={errors.email}
            >
              <input
                {...register("email", { required: "email required" })}
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
                Create Account
              </button>
            </div>
            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </main>
  );
};

export default Register;
