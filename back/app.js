const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const usersRouter = require("./routes/usersRoutes");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "many request in this time please try agein later",
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// users routes
app.use("/api/v1/users", limiter, usersRouter);

module.exports = app;
