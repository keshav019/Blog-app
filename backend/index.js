require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/authRoutes");

//Connect database
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogRouter);
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
app.get("*", (req, res) => {
  res.status(404).send({ message: "Page not found" });
});

// middleware for handling error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(errorMessage);
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
