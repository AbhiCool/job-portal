import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import { AppDataContext } from "../../context/AppContext";
const Signup = () => {
  const { navigate, axios, url } = useContext(AppDataContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: null,
  });

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData({
      ...formData,
      [e.target.name]: selectedFile,
    });

    setFile(selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const formPayload = new FormData();

      for (let key in formData) {
        formPayload.set(key, formData[key]);
      }
      console.log(url.register, formPayload);
      const res = await axios.post(url.register, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message } = res.data;
      console.log("");
      if (success) {
        toast.success("User logged in successfully");

        navigate("/login");
      } else {
        toast.error(message);
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
          Sign Up
        </h2>

        <div className="w-full my-4">
          {preview && (
            <div className="mb-3 flex  justify-center">
              <img
                src={preview}
                className="w-24 h-24 rounded-full border shadow object-cover object-center"
                alt=""
              />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          name="image"
          className="block w-full text-sm text-gray-500 
          file:mr-4 
          file:py-2 
          file:px-4 
          file:rounded-full 
          file:border-0 
          file:text-sm 
          file:font-semibold
          file:bg-blue-50 
          file:text-blue-700 
          hover:file:bg-blue-100
          cursor-pointer
          "
          onChange={handleFileChange}
        />
        <input
          name="name"
          type="text"
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={handleOnChange}
        />
        <input
          name="email"
          type="email"
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleOnChange}
        />

        <select
          name="role"
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          value={formData.role}
          onChange={handleOnChange}
        >
          <option value="">--Select your role--</option>
          <option value="employer">Employer</option>
          <option value="student">Student</option>
        </select>

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
          Signup
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
