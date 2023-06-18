require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorMiddleware");
const authRouter = require("./routes/authRoutes");
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`Server started at http://localhost:${PORT}`);
});
