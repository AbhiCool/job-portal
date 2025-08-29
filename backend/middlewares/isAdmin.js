const jwt = require("jsonwebtoken");
const isAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);

    if (decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Unauthorised",
    });
  }
};

module.exports = isAdmin;
