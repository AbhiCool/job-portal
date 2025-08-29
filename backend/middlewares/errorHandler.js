const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Optional: full error stack
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
