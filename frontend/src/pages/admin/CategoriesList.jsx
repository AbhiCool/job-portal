import React, { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import { serverUrl, url } from "../../utils/constants";
import toast from "react-hot-toast";

const CategoriesList = () => {
  const { categoriesData,setCategoriesData, axios } = useContext(AppDataContext);

  const handleCategoryDelete = async(id)=> {
    try{
      const res = await axios.delete(url.deleteCategory + id);

      const {success, message} = res.data;
      if(success) {
        toast.success(message);

        setCategoriesData(categoriesData.filter((category) => category._id !== id));

      }
      else {
        toast.error(message);
      }
    }
    catch(error) {
      console.log(error)
      toast.error(error.response.data.message);
    }


  }
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Categories
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray- text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b">Logo</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Acttion</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category) => (
              <tr key={category._id}>
                <td className="py-3 px-4 border-b">
                  <img
                    className="w-12 h-12 ronded object-cover object-center border"
                    src={serverUrl + category.logo}
                    alt=""
                  />
                </td>
                <td>
                  <p className="py-3 px-4 font-medium">{category.name}</p>
                </td>
                <td className="py-3 px-4">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active: scale-95 cursor-pointer" onClick={()=>handleCategoryDelete(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;
