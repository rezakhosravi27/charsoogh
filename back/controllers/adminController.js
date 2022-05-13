const adminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const homeModel = require("../models/homeModel");
const carModel = require("../models/carModel");
const mobileModel = require("../models/mobileModel");
const userModel = require("../models/usersModel");

const generateJwttoken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: process.env.JWT_EXPIRESIN_ADMIN,
  });
  return token;
};

const createSendCode = (res, admin, statusCode) => {
  const token = generateJwttoken(admin._id);
  res.status(statusCode).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.createAdmin = async (req, res) => {
  try {
    const admin = await adminModel.create(req.body);
    admin.password = undefined;
    res.status(201).json({
      status: "success",
      data: {
        admin,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const admin = await adminModel
      .findOne({ name: req.body.name })
      .select("+password");
    if (!admin) {
      return res.status(404).json({
        status: "unSuccess",
        message: "user not found",
      });
    }

    if (req.body.password !== admin.password) {
      return res.status(400).json({
        status: "unSuccess",
        message: "password not correct",
      });
    }

    createSendCode(res, admin, 200);
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.protectAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(404).json({
        status: "unSuccess",
        message: "token not found",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    const admin = adminModel.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({
        status: "unSuccess",
        message: "admin not found or delete admin",
      });
    }

    req.admin = admin;
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }

  next();
};

// Home Protect
exports.activeHomePost = async (req, res) => {
  try {
    const home = await homeModel
      .findByIdAndUpdate(req.params.homesId, req.body, {
        new: true,
      })
      .select("+activePost");
    res.status(200).json({
      status: "success",
      data: {
        home,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.getHomes = async (req, res) => {
  try {
    const homes = await homeModel
      .find({ activePost: { $ne: true } })
      .select("+activePost");
    if (!homes) {
      res.status(404).json({
        status: "unSuccess",
        message: "home not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        homes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: err,
    });
  }
};

exports.deActiveHomePost = async (req, res) => {
  try {
    const home = await homeModel.findByIdAndDelete(req.params.homesId);
    if (!home) {
      res.status(404).json({
        status: "unSuccess",
        message: "home not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "home delete",
    });
  } catch (err) {
    res.status(500).json({
      status: "success",
      message: err,
    });
  }
};

// Car Protect
exports.getCars = async (req, res) => {
  try {
    const cars = await carModel
      .find({ activePost: { $ne: true } })
      .select("+activePost");
    if (!cars) {
      return res.status(400).json({
        status: "unSuccess",
        message: "car not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.activeCarPost = async (req, res) => {
  try {
    const activeCarPost = await carModel
      .findByIdAndUpdate(req.params.carId, req.body, {
        new: true,
      })
      .select("+activePost");

    if (!activeCarPost) {
      return res.status(400).json({
        status: "unSuccess",
        message: "car not found and not update",
      });
    }

    res.status(200).json({
      status: "success",
      message: "this post actived",
      data: {
        activeCarPost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deActiveCarPost = async (req, res) => {
  try {
    const car = await carModel.findByIdAndDelete(req.params.carId);
    if (!car) {
      return res.status(400).json({
        status: "unSuccess",
        message: "car not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "this post deActived",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

// Mobile Protect

exports.getMobiles = async (req, res) => {
  try {
    const mobiles = await mobileModel
      .find({ activePost: { $ne: true } })
      .select("+activePost");
    if (!mobiles) {
      return res.status(400).json({
        status: "unSuccess",
        message: "mobiles not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        mobiles,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.activeMobilePost = async (req, res) => {
  try {
    const activeMobilePost = await mobileModel
      .findByIdAndUpdate(req.params.mobileId, req.body, {
        new: true,
      })
      .select("+activePost");

    if (!activeMobilePost) {
      return res.status(400).json({
        status: "unSuccess",
        message: "mobile not found and not update",
      });
    }

    res.status(200).json({
      status: "success",
      message: "this post actived",
      data: {
        activeMobilePost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deActiveMobilePost = async (req, res) => {
  try {
    const mobile = await mobileModel.findByIdAndDelete(req.params.mobileId);
    if (!mobile) {
      return res.status(400).json({
        status: "unSuccess",
        message: "mobile not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "this post deActived",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

// Users Protect
exports.getUsers = async (req, res) => {
  try {
    const query = {
      ...req.query,
    };
    const users = await userModel.find(query);
    if (!users) {
      res.status(400).json({
        status: "unSuccess",
        message: "users not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.userState = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );

    if (!user) {
      res.status(400).json({
        status: "unSuccess",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};
