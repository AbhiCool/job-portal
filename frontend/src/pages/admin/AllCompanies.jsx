import React, { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { serverUrl } from "../../utils/constants";

const AllCompanies = () => {
  const { companyData } = useContext(AppDataContext);

  return (
    <div className=" max-w-4xl w-full p-6 not-last:mx-auto mt-10 bg-white shadow rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Company List</h2>
      </div>
      <table className="w-full border border-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">Logo</th>
            <th className="text-left p-3 border-b">Name</th>
            <th className="text-left p-3 border-b">About</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {companyData.map((company) => (
            <tr key={company._id}>
              <td className="p-3 border-b">
                <img
                  src={serverUrl + company.logo}
                  alt=""
                  className="w-16 h-16 object-cover object-center border"
                />
              </td>
              <td className="p-3 border-b">{company.name}</td>
              <td className="p-3 border-b">{company.about}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCompanies;
