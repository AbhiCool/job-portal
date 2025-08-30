export const serverUrl = "http://localhost:3000/";
export const url = {
  register: serverUrl + "auth/register",
  login: serverUrl + "auth/login",
  logout: serverUrl + "auth/logout",
  userProfile: serverUrl + "user/userProfile",
  updateProfile: serverUrl + "user/updateProfile/",
  getAllStudents: serverUrl + "user/getAllStudents",

  addCategory: serverUrl + "category/add",
  getCategories: serverUrl + "category/all",
  deleteCategory: serverUrl + "category/delete/",

  addCompany: serverUrl + "company/add",
  getEmployerCompanies: serverUrl + "company/employerCompanies",
  getAllCompanies: serverUrl + "company/all",
  deleteCompany: serverUrl + "company/delete/",
};
