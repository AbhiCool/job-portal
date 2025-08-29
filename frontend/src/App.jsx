import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import AllJobs from "./pages/admin/AllJobs";
import JobDetails from "./pages/JobDetails";
import EmployerLayout from "./pages/employer/EmployerLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Toaster } from "react-hot-toast";
import MyApplications from "./pages/user/MyApplications";
import Profile from "./pages/user/Profile";
import CompaniesList from "./pages/employer/CompaniesList";
import AddCompany from "./pages/employer/AddCompany";
import PostJob from "./pages/employer/PostJob";
import JobsList from "./pages/employer/JobsList";
import Applicants from "./pages/employer/Applicants";
import AdminLayout from "./pages/admin/adminLayout";
import CategoriesList from "./pages/admin/CategoriesList";
import AddCategory from "./pages/admin/AddCategory";
import AllCompanies from "./pages/admin/AllCompanies";
import AllUsers from "./pages/admin/AllUsers";
import AllApplications from "./pages/admin/AllApplications";
import Jobs from "./pages/admin/Jobs";
const App = () => {
  const location = useLocation();
  const pathname = location.pathname;

  //   max-w-xs
  // sm:max-w-sm
  // md:max-w-md
  // lg:max-w-lg
  // xl:max-w-2xl
  // 2xl:max-w-7xl
  return (
    <div
      className="w-full 
      max-w-[1200px]
    mx-auto 
    px-4"
    >
      <Toaster />
      {!pathname.includes("admin") && !pathname.includes("employer") && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/all-jobs" element={<AllJobs />}></Route>
        <Route path="/job-details/:id" element={<JobDetails />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        /**************** User Routes **********************/
        <Route path="/my-applications" element={<MyApplications />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        /**************** Employer Routes **********************/
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<CompaniesList />}></Route>
          <Route path="add-company" element={<AddCompany />}></Route>
          <Route path="post-job" element={<PostJob />}></Route>
          <Route path="jobs-list" element={<JobsList />}></Route>
          <Route path="applicants" element={<Applicants />}></Route>
        </Route>
        /**************** Admin Routes **********************/
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<CategoriesList />}></Route>
          <Route path="add-category" element={<AddCategory />}></Route>
          <Route path="all-companies" element={<AllCompanies />}></Route>
          <Route path="all-applications" element={<AllApplications />}></Route>
          <Route path="all-users" element={<AllUsers />}></Route>
          <Route path="jobs" element={<Jobs />}></Route>
        </Route>
      </Routes>
      {!pathname.includes("admin") && !pathname.includes("employer") && (
        <Footer />
      )}
    </div>
  );
};

export default App;
