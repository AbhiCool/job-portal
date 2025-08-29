import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppDataContext } from "../context/AppContext";
import JobCard from "./JobCard";

const Jobs = () => {
  const { jobsData } = useContext(AppDataContext);
  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
        Featured Jobs
      </h1>

      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 items-center justify-center gap-12">
        {jobsData.map((job) => {
          return <JobCard key={job._id} job={job}></JobCard>;
        })}
      </div>
    </div>
  );
};

export default Jobs;
