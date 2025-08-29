import React, { useContext, useState } from "react";
import { AppDataContext } from "../../context/AppContext";
import { url } from "../../utils/constants";
import toast from "react-hot-toast";

const AddCategory = () => {
  const { navigate, axios, categoriesData, setCategoriesData } =
    useContext(AppDataContext);

  const [categoryData, setCategoryData] = useState({
    name: "",
    logo: null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setCategoryData({
        ...categoryData,
        [name]: files[0],
      });

      setFile(files[0]);

      setPreview(URL.createObjectURL(files[0]));
    } else {
      setCategoryData({
        ...categoryData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("categoryData", categoryData);

    try {
      const formPayload = new FormData();

      for (let key in categoryData) {
        formPayload.append(key, categoryData[key]);
      }

      const res = await axios.post(url.addCategory, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { success, message, category } = res.data;
      if (success) {
        toast.success(message);
        setCategoryData({
          name: "",
          logo: null,
        });

        setCategoriesData([...categoriesData, category]);

        setFile(null);
        setPreview(null);
        navigate("/admin");
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center max-w-4xl w-full mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add New Category
        </h2>
        <div className="w-full my-4">
          {/* profile image preview */}
          {preview && (
            <div className="mb-3 flex justify-center">
              <img
                src={preview}
                alt="Profile preview"
                className="w-24 h-24 object-cover rounded-full border shadow"
              />
            </div>
          )}
          {/* File upload input */}
          <input
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            type="file"
            accept="image/*"
            name="logo"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="category">Category Name</label>
        <input
          type="text"
          name="name"
          value={categoryData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
        />
        <button
          type="submit"
          className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
