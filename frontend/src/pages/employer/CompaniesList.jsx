import React, { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CompaniesList = () => {
  const { companyData, setCompanyData, navigate } = useContext(AppDataContext);

  const handleDelete = (id) => {
    setCompanyData(companyData.filter((company) => company._id !== id));
    toast.success("Company deleted successfully");
  };
  const handleAddCompany = () => {
    navigate("/employer/add-company");
  };
  return (
    <div className=" max-w-4xl w-full p-6 not-last:mx-auto mt-10 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Company List</h2>
        <button
          onClick={handleAddCompany}
          className="bg-primary text-white px-4 py-2  rounded hover:bg-blue-700 cursor-pointer"
        >
          Add Company
        </button>
      </div>
      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Logo</th>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">About</th>
            <th className="text-left p-3 border-b">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {companyData.map((company) => (
            <tr key={company._id}>
              <td className="p-3 border-b">
                <img
                  src={company.logo}
                  alt=""
                  className="w-16 h-16 object-cover object-center border"
                />
              </td>
              <td className="p-3 border-b">{company.name}</td>
              <td className="p-3 border-b">{company.about}</td>
              <td className="p-3 border-b">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(company._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesList;
