import React, { useContext, useState } from "react";
import { AppDataContext } from "../../context/AppContext";

const PostJob = () => {
  const { navigate } = useContext(AppDataContext);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    image: null,
    requirements: "",
    benefits: "",
    jobLevel: "",
    education: "",
    experience: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value, files } = e.target;

    if (files) {
      setJobData({
        ...jobData,
        [name]: files[0],
      });

      const imageUrl = URL.createObjectURL(files[0]);

      setPreview(imageUrl);
    } else {
      setJobData({
        ...jobData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("josbData", jobData);

    navigate("/employer/jobs-list");
  };

  console.log("jobData", jobData);
  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white text-gray-500 max-w-5xl w-full mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Post a Job
      </h2>
      {preview && (
        <div className="mb-3 flex justify-center">
          <img
            src={preview}
            alt=""
            className="w-24 h-24 object-center object cover rounded-full border shadow"
          />
        </div>
      )}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          name="image"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>
      <label htmlFor="job-title">Job Title</label>
      <input
        type="text"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        placeholder="Enter job title"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />
      {/* company name  */}
      <label>Company Name</label>
      <input
        type="text"
        name="company"
        value={jobData.company}
        onChange={handleChange}
        placeholder="Enter company name"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/*  description */}
      <label>Description</label>
      <textarea
        name="description"
        value={jobData.description}
        onChange={handleChange}
        placeholder="Enter description"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/*  Location */}
      <label>Location</label>
      <input
        type="text"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        placeholder="Job location"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/*  Salary */}
      <label>Salary</label>
      <input
        type="text"
        name="salary"
        value={jobData.salary}
        onChange={handleChange}
        placeholder="e.g $80,000"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
        required
      />

      {/*  Job type   */}
      <label>Job Type</label>
      <select
        name="type"
        value={jobData.type}
        onChange={handleChange}
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      >
        <option value="">Select Type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Remote">Remote</option>
        <option value="Internship">Internship</option>
      </select>

      {/*  Requirements */}
      <label>Requirements</label>
      <textarea
        name="requirements"
        value={jobData.requirements}
        onChange={handleChange}
        placeholder="Separate with commas"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/*  Benefits */}
      <label>Benefits</label>
      <textarea
        name="benefits"
        value={jobData.benefits}
        onChange={handleChange}
        placeholder="Separate with commas"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/*  Job Level */}
      <label>Job Level</label>
      <input
        type="text"
        name="jobLevel"
        value={jobData.jobLevel}
        onChange={handleChange}
        placeholder="e.g Senior, Mid-level"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/*  Education */}
      <label>Education</label>
      <input
        type="text"
        name="education"
        value={jobData.education}
        onChange={handleChange}
        placeholder="e.g Bachelor's degree"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      {/*  Experience */}
      <label>Experience</label>
      <input
        type="text"
        name="experience"
        value={jobData.experience}
        onChange={handleChange}
        placeholder="e.g. 3 years"
        className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4 mb-4"
      />

      <button
        type="submit"
        className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white"
      >
        Post Job
      </button>
    </form>
  );
};

export default PostJob;
