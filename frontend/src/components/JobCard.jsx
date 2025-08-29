import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppDataContext } from "../context/AppContext";

const JobCard = ({ job }) => {
  const { navigate } = useContext(AppDataContext);
  const handleOnClick = (id) => {
    navigate("/job-details/" + id);
  };

  return (
    <div
      key={job._id}
      className="flex flex-col  gap-1 border border-gray-300 rounded-md p-5 shadow w-auto lg:max-w-[424px] bg-gradient-to-r from-purple-200/80 cursor-pointer  "
      onClick={() => handleOnClick(job._id)}
    >
      <h1 className="text-2xl font-medium text-gray-800">{job.title}</h1>

      <div className="flex gap-4 items-center">
        <p className="text-sm bg-green-300/40 p-1 rounded">{job.type}</p>
        <p className="text-sm text-gray-800">Salary {job.salary}</p>
      </div>

      <div className="flex items-center gap-4 my-2">
        <img className="w-[48px] h-[48px]" src={job.image} alt="" />
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <h3>{job.company}</h3>, <h3>{job.location}</h3>
        </div>
        <div>
          <img className="w-12 h-12" src={assets.save_later_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
