import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { AppDataContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { serverUrl, url } from "../utils/constants.js";
const Navbar = () => {
  const { navigate, setQuery, user, setUser, axios } =
    useContext(AppDataContext);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const handleOnSearch = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setQuery(input);
      navigate("/all-jobs");
      setInput("");
    }
  };
  const logout = async () => {
    try {
      const res = await axios.get(url.logout);

      const { success, message } = res.data;

      if (success) {
        setUser(false);
        navigate("/");
        toast.success(message);
      }
    } catch (error) {}
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="" className="min-w-20" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/all-jobs">Jobs</Link>
        <Link to="/about">About</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search jobs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleOnSearch}
          />
        </div>

        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-primary transition text-white rounded-full border border-gray-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <div
            className="relative inline-block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <img
              src={serverUrl + user.image || assets.user_profile}
              alt=""
              className="w-12 h-12 rounded-full cursor-pointer border border-gray-300 object-cover object-center"
            />
            {open && (
              <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/my-applications");
                  }}
                >
                  My Applications
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </p>
                <p
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to="/">Home</Link>
        <Link to="/all-jobs">Jobs</Link>
        <Link to="/about">About</Link>
        <button
          className="cursor-pointer px-6 py-2 mt-2 bg-primary transition text-white rounded-full text-sm"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
