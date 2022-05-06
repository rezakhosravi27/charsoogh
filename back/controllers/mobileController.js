const mobileModel = require("../models/mobileModel");

exports.createMobile = async (req, res) => {
  try {
    const createMobile = {
      ...req.body,
      image:
        req.protocol + "://" + req.get("host") + "/public/" + req.file.filename,
      parent: "6275020abc986230d77a6cbe",
    };
    const mobile = await mobileModel.create(createMobile);
    res.status(201).json({
      status: "success",
      data: {
        mobile,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.getMobiles = async (req, res) => {
  try {
    const mobiles = await mobileModel.find();
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
