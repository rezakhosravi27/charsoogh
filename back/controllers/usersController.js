const usersModel = require("../models/usersModel");
const sendEmail = require("../utils/mail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

const createSendCode = (res, user, statusCode) => {
  const token = generateJwtToken(user._id);
  const cookiesOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwtToken", token, cookiesOptions);

  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

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

    createSendCode(res, user, 200);
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1) get user with send email of database
    const user = await usersModel.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({
        status: "unSuccess",
        message: "user not exist and email not send in body",
      });
    }

    //2) generate new token for reset password
    const resetToken = await user.generateResetToken();
    user.save({
      validateBeforeSave: false,
    });

    //3) send token with email to user
    const resetURL = `http://localhost:3000/auth/forgotPassword/${resetToken}`;

    const html = `do you forgot password ? if you forgot password click on link $<a href=${resetURL}>click this link</a> /n and if not forgot password remember this message`;

    try {
      await sendEmail({
        email: user.email,
        subject: "for forgot password",
        html,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.expireResetPasswordToken = undefined;

      user.save({
        validateBeforeSave: false,
      });

      return res.status(500).json({
        status: "unSuccess",
        message: "error to send email to client",
      });
    }

    res.status(200).json({
      status: "success",
      message: "send token to email",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await usersModel.findOne({
      resetPasswordToken: hashedToken,
      expireResetPasswordToken: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(403).json({
        status: "unSuccess",
        message: "error, token has expired",
      });
    }

    (user.password = req.body.password),
      (user.confirmPassword = req.body.confirmPassword),
      (user.resetPasswordToken = undefined),
      (user.expireResetPasswordToken = undefined),
      await user.save();

    createSendCode(res, user, 200);
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userDelete = await usersModel.findByIdAndUpdate(
      req.params.userId,
      { active: false },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      message: "user delete",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};
