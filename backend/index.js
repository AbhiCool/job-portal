const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { config } = require("dotenv");
config();
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const companyRoutes = require("./routes/company.routes");

connectDB();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/company", companyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
