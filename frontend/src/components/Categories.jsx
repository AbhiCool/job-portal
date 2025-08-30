import React, { useContext } from "react";
import { categories } from "../assets/assets";
import { AppDataContext } from "../context/AppContext";
import { serverUrl } from "../utils/constants";

const Categories = () => {
  const { categoriesData } = useContext(AppDataContext);
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-red-100 text-red-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-indigo-100 text-indigo-800",
    "bg-pink-100 text-pink-800",
    "bg-gray-100 text-gray-800",
  ];

  return (
    <div className="py-16">
      <h1 className="text-2xl md:text-5xl font-semibold text-gray-800">
        Most Popular Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center mt-10">
        {categoriesData.map((item, index) => (
          <div
            key={item._id}
            className={`flex max-w-[250px] items-center justify-center gap-1 border border-gray-300 rounded-lg py-6 px-4 shadow  ${
              colors[index % colors.length]
            }`}
          >
            <img src={serverUrl + item.logo} alt="" className="w-12 h-12 rounded-full"/>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm">{item.positions} open positions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
