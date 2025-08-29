const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

const upload = require("../middlewares/multer");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
router.post(
  "/add",
  isAuthenticated,
  isAdmin,
  upload.single("logo"),
  categoryController.addCategory
);

router.get("/all", isAuthenticated, isAdmin, categoryController.getCategories);

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
