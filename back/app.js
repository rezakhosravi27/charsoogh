const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const usersRouter = require("./routes/usersRoutes");
const collectionRouter = require("./routes/collectionRoutes");
const mobileRouter = require("./routes/mobileRoutes");
const allCategoriesRouter = require("./routes/allCategories");
const homeRouter = require("./routes/homeRoutes");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "many request in this time please try agein later",
});

app.use("/public", express.static("public"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

// routes
app.use("/api/v1/users", limiter, usersRouter);
app.use("/api/v1/collections", limiter, collectionRouter);
app.use("/api/v1/mobiles", limiter, mobileRouter);
app.use("/api/v1/allCategories", limiter, allCategoriesRouter);
app.use("/api/v1/home", limiter, homeRouter);

module.exports = app;
