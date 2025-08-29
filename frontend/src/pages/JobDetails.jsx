import React, { useContext } from "react";
import { AppDataContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { jobsData, isJobApplied, setIsJobApplied, saveJob, savedJob } =
    useContext(AppDataContext);

  let { id } = useParams();
  id = parseInt(id);

  const job = jobsData.find((item) => item._id === id);

  console.log("job", job);

  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl text-gray-800 font-semibold">
        Job Details
      </h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center mt-10 gap-10">
        {/* left side */}
        <div className="flex flex-col ">
          <div className="flex items-center gap-5">
            <img src={job?.image} alt="" className="w-[86px] h-[86px]" />
            <div className="">
              <h2 className="font-semibold text-lg md:text-2xl">
                {job?.title}
              </h2>
              <p className="text-xs sm:text-base ">
                <span>at {job?.company}</span>
                <span className="border border-green-800 p-1 rounded bg-green-200/40 ml-2">
                  {job?.type}
                </span>
              </p>
            </div>
          </div>

          {/* job description */}
          <div className="my-5 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Job Description
            </h2>
            <p>{job?.description}</p>
          </div>

          {/* job requirements */}
          <div className="my-1 flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Requirements
            </h4>
            <ul className="list-disc">
              {job?.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          {/* Job benefits */}
          <div className="my-5 flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Job Benefits
            </h4>
            <ul className="list-disc">
              {job?.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col ">
          <div className="flex gap-4">
            <div onClick={(job) => saveJob(job)}>
              <img
                src={assets.save_later_icon}
                alt=""
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={() => {
                setIsJobApplied(!isJobApplied);
                toast.success("Job applied");
              }}
              disabled={isJobApplied}
              className={`cursor-pointer px-10 py-1  transition text-white rounded-full bg-primary`}
            >
              {!isJobApplied ? "Apply Now" : "Applied"}
            </button>
          </div>

          {/* job salary */}
          <div className="my-5 flex flex-wrap gap-3 border border-gray-300 p-4">
            <p className="text-base text-gray-800 font-medium">
              Salary :{job?.salary}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-base text-gray-800 font-medium">
                Job Location
              </p>
              <p>{job?.location}</p>
            </div>
          </div>

          {/* job overview */}
          <div className="my-1 flex flex-col gap-3 border border-gray-300 p-4">
            <p className="text-xl font-bold text-gray-800">Job Overview</p>
            <p>{job?.overview}</p>
            <div className="flex flex-wrap items-center gap-2">
              <p>posted date : {job?.postedDate}</p>
              <p>job level : {job?.jobLevel}</p>
              <p>Education : {job?.education}</p>
              <p>Experience : {job?.experience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
