const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("node:path");
const fsp = require("node:fs/promises");
const capitalize = require("../utils/capitalise");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.staus(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    let image = null;
    if (req.file) {
      console.log(req.file);

      image = req.file.path + path.extname(req.file.originalname);
      await fsp.rename(req.file.path, image);
    }
    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
      role,
      image,
    });

    res.status(200).json({
      success: true,
      message: newUser.role + " Registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    const userFiltered = user.toObject();

    delete userFiltered.password;

    res.status(200).json({
      success: true,
      message: capitalize(user.role) + " logged in successfully",
      user: userFiltered,
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
