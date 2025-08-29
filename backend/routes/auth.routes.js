const express = require("express");
const { register, login, logout } = require("../controllers/auth.controller");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
