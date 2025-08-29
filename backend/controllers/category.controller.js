const path = require("node:path");
const fsp = require("node:fs/promises");

const CategoryModel = require("../models/Category.model");
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path + path.extname(req.file.originalname);

      await fsp.rename(req.file.path, imageUrl);
    }

    const newCategory = await CategoryModel.create({
      name,
      logo: imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};
