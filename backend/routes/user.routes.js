const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const isAdmin = require("../middlewares/isAdmin");

router.get("/userProfile", isAuthenticated, userController.userProfile);

router.put(
  "/updateProfile/:id",
  isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  userController.updateProfile
);

router.get(
  "/getAllStudents",
  isAuthenticated,
  isAdmin,
  userController.getAllStudents
);

module.exports = router;
