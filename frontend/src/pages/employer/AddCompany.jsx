import React, { useContext, useState } from "react";
import { AppDataContext } from "../../context/AppContext";

const AddCompany = () => {
  const { navigate } = useContext(AppDataContext);

  const [companyData, setCompanyData] = useState({
    name: "",
    about: "",
    logo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value, files } = e.target;

    if (files) {
      setCompanyData({
        ...companyData,
        [name]: files[0],
      });

      const imageUrl = URL.createObjectURL(files[0]);

      setPreview(imageUrl);
    } else {
      setCompanyData({
        ...companyData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("companyData", companyData);

    navigate("/employer");
  };
  return (
    <div className="flex items-center max-w-4xl w-full mx-auto">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-medium text-gray-800 md:text-5xl">
          Register a new company
        </h2>
        <div className="w-full my-4">
          {preview && (
            <div className="mb-3 flex justify-center ">
              <img
                src={preview}
                alt=""
                className="w-24 h-24 object-cover object-center rounded-full border shadow"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            name="logo"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
        <label htmlFor="name">Company Name</label>
        <input
          type="text"
          name="name"
          value={companyData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
        />
        <div className="mb-4 ">
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            rows="4"
            value={companyData.about}
            onChange={handleChange}
            placeholder="Enter about"
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          ></textarea>
        </div>
        <button
          type="sub
          mit"
          className="w-full bg-primary active:scale-95 transition py-2.5 rounded text-white"
        >
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompany;
