const adminModel = require("../models/adminModel");

exports.createAdmin = async (req, res) => {
  try {
    const admin = await adminModel.create(req.body);
    res.status(200).json({
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
        status: "success",
        message: "error or admin not found ",
      });
    }
    if (req.body.password !== admin.password) {
      res.status(400).json({
        status: "unSuccess",
        message: "user name or password not correct",
      });
    }

    res.status(200).json({
      status: "success",
      message: "user login ",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};
