import { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import { Outlet, Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { url } from "../../utils/constants";
import toast from "react-hot-toast";

const EmployerLayout = () => {
  const { navigate, setUser, axios } = useContext(AppDataContext);
  const sidebarLinks = [
    { name: "Companies", path: "/employer" },
    { name: "Add company", path: "/employer/add-company" },
    { name: "Applicants", path: "/employer/applicants" },
    { name: "Jobs", path: "/employer/jobs-list" },
    { name: "post job", path: "/employer/post-job" },
  ];

  const handleLogout = async () => {
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
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <Link to="/employer">
          <img src={assets.logo} alt="" className="min-w-20" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Employer</p>
          <button
            onClick={handleLogout}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center py-3 px-4 gap-3 
                            ${
                              index === 0
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
            >
              <p className="md:block hidden text-center">{item.name}</p>
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default EmployerLayout;
