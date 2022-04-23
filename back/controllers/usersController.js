const usersModel = require("../models/usersModel");

exports.getUsers = async (req, res) => {
  let query = { ...req.query };
  let excludeQuery = ["sort", "filter", "filter", "page"];
  excludeQuery.forEach((item) => delete query[item]);

  let queryString = JSON.stringify(query);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const users = await usersModel.find(JSON.parse(queryString));
  res.status(200).json({
    status: "success",
    users,
  });
};

exports.signUp = async (req, res) => {
  try {
    const emailExist = await usersModel.findOne({
      email: req.body.email,
    });
    const mobileExist = await usersModel.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (emailExist || mobileExist) {
      return res.status(400).json({
        status: "unSuccess",
        message: "user already exist",
      });
    }

    const user = await usersModel.create(req.body);
    user.password = undefined;
    return res.status(200).json({
      status: "success",
      message: "user create",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;

    if (!password || !email)
      return res.status(404).json({
        status: "unSuccess",
        message: "email or password not required",
      });

    const user = await usersModel.findOne({ email }).select("+password");

    if (!user)
      return res.status(404).json({
        status: "unSuccess",
        message: "user not found",
      });

    const passwordCorrect = await user.comparePassword(password, user.password);
    if (!passwordCorrect)
      return res.status(404).json({
        status: "unSuccess",
        message: "password or email not correct",
      });

    return res.status(200).json({
      status: "success",
      message: "login success",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};
