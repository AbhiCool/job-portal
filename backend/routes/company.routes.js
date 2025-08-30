const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const isAuthenticated = require("../middlewares/isAuthenticated");
const companyController = require("../controllers/company.controller");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/add",
  isAuthenticated,
  upload.single("logo"),
  companyController.addCompany
);

router.get(
  "/employerCompanies",
  isAuthenticated,
  companyController.getEmployerCompanies
);

router.get("/all", isAdmin, companyController.getAllCompanies);

router.delete("/delete/:id", isAuthenticated, companyController.deleteCompany);

module.exports = router;
