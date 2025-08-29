import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { AppDataContext } from "../../context/AppContext";
const Login = () => {
  const { navigate, setUser, url, axios } = useContext(AppDataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const res = await axios.post(url.login, formData);

      const { success, message, user } = res.data;

      console.log(res.data);
      if (success) {
        if (user.role === "employer") {
          setUser(user);
          navigate("/employer");
          toast.success(message);
        } else if (user.role === "admin") {
          setUser(user);
          navigate("/admin");
          toast.success(message);
        } else {
          setUser(user);

          navigate("/");

          toast.success(message);
        }
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>
        <input
          name="email"
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleOnChange}
        />
        <input
          name="password"
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleOnChange}
        />

        <button
          type="submit"
          className="w-full my-5 bg-primary active:scale-95 transition py-2.5 rounded-full text-white"
        >
          Log in
        </button>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
