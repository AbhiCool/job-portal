import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { categories, jobs, companies, applicants } from "../assets/assets";
import toast from "react-hot-toast";

import { serverUrl, url } from "../utils/constants";

export const AppDataContext = createContext();
const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const [jobsData, setJobsData] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState("");

  const [query, setQuery] = useState("");

  const [isJobApplied, setIsJobApplied] = useState(false);

  const [savedJobs, setSavedJobs] = useState([]);

  const [companyData, setCompanyData] = useState([]);
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [companiesError, setCompaniesError] = useState("");

  const [applicantsData, setApplicantsData] = useState([]);
  const [isLoadingApplicants, setIsLoadingApplicants] = useState(false);
  const [applicantsError, setApplicantsError] = useState("");

  // load logged in userdata
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const res = await axios.get(url.userProfile);
        console.log("data", res.data);
        const { success, user } = res.data;

        if (success) {
          setUser(user);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchLoggedInUser();
  }, []);

  const loadAppplicants = async () => {
    setIsLoadingApplicants(true);
    try {
      // const res = await axios.get("/categories");

      // setCategoriesData(res.data);
      setApplicantsData(applicants);
      setIsLoadingApplicants(false);
    } catch (error) {
      setApplicantsError(error.response.data.message);
      setIsLoadingApplicants(false);
    }
  };
  const loadCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const res = await axios.get(url.getCategories);

      const { success, message, categories } = res.data;
      if (success) {
        setCategoriesData(categories);
      } else {
        setCategoryError(message);
      }

      setIsLoadingCategories(false);
    } catch (error) {
      setCategoryError(error.response.data.message);
      setIsLoadingCategories(false);
    }
  };

  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      // const res = await axios.get("/categories");

      // setCategoriesData(res.data);
      setJobsData(jobs);
      setIsLoadingJobs(false);
    } catch (error) {
      setJobsError(error.response.data.message);
      setIsLoadingJobs(false);
    }
  };

  const loadCompanies = async () => {
    setIsLoadingCompanies(true);
    try {
      // const res = await axios.get("/categories");

      // setCategoriesData(res.data);
      setCompanyData(companies);
      setIsLoadingCompanies(false);
    } catch (error) {
      setCompaniesError(error.response.data.message);
      setIsLoadingCompanies(false);
    }
  };

  const saveJob = (job) => {
    setSavedJobs((prev) => {
      if (prev.find((item) => item._id === job._id)) return prev;
      return [...prev, job];
    });
    toast.success("Job saved successfully");
  };

  const value = {
    navigate,
    user,
    setUser,

    categoriesData,
    setCategoriesData,
    isLoadingCategories,
    categoryError,
    jobsData,
    isLoadingJobs,
    jobsError,
    query,
    setQuery,
    isJobApplied,
    setIsJobApplied,
    savedJobs,
    setSavedJobs,
    saveJob,

    companyData,
    setCompanyData,
    isLoadingCompanies,
    companiesError,

    applicantsData,
    setApplicantsData,
    isLoadingApplicants,
    applicantsError,

    axios,
    url,
  };

  useEffect(() => {
    loadJobs();
    loadCompanies();
    loadAppplicants();
    loadCategories();
  }, [user]);

  // useEffect(() => {
  //   loadCategories();
  // }, [categoriesData]);

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

export default AppProvider;
