const path = require("node:path");
const UserModel = require("../models/User.model");
const fsp = require("node:fs/promises");
exports.userProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      meesage: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    console.log(req.body);
    const {
      name,
      email,
      phone,
      location,
      education,
      experience,
      skills,
      about,
    } = req.body;

    const updates = {
      name,
      email,
      phone,
      location,
      education,
      experience,
      skills,
      bio: about,
    };

    if (req.files?.profileImage?.[0]) {
      const image =
        req.files.profileImage[0].path +
        path.extname(req.files.profileImage[0].originalname);

      await fsp.rename(req.files.profileImage[0].path, image);

      updates.image = image;
    }

    if (req.files?.resume?.[0]) {
      const resume =
        req.files.resume[0].path +
        path.extname(req.files.resume[0].originalname);

      await fsp.rename(req.files.resume[0].path, resume);

      updates.resume = resume;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await UserModel.find({
      role: "student",
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      students,
    });
  } catch (error) {
    next(error);
  }
};
