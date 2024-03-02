import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const Login = () => {
  return (
    <>
      <Header />
      <main>
        <section className="container">
          {/* Login Form into a box center of the page */}
          <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form action="">
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Login
                </button>
              </div>
              <p className="text-center">
                Don't have an account?{" "}
                <a
                  href="./register.html"
                  className="text-indigo-600 hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Login;
