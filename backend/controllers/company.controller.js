const CompanyModel = require("../models/Company.model");
const fsp = require("node:fs/promises");
const path = require("node:path");

exports.getEmployerCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyModel.find({ createdBy: req.user.id });

    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "Companies not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Companies fetched successfully",
        companies: companies,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyModel.find({});

    if (!companies) {
      return res.status(400).json({
        success: false,
        message: "Companies not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Companies fetched successfully",
        companies: companies,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.addCompany = async (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about || !req.file) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  let logoUrl = null;
  if (req.file) {
    const imageUrl = req.file.path + path.extname(req.file.originalname);

    await fsp.rename(req.file.path, imageUrl);

    logoUrl = imageUrl;
  }

  const newCompany = await CompanyModel.create({
    name,
    about,
    logo: logoUrl,
    createdBy: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Company added successfully",
    company: newCompany,
  });
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await CompanyModel.findByIdAndDelete(id);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
      company,
    });
  } catch (error) {
    next(error);
  }
};
