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
    if (!mobiles) {
      return res.status(404).json({
        status: "unSuccess",
        message: "mobiles not found ",
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

exports.getMobile = async (req, res) => {
  try {
    const mobile = await mobileModel.findById(req.params.mobileId);
    if (!mobile) {
      return res.status(404).json({
        status: "unSuccess",
        message: "mobile not found ",
      });
    }
    res.status(200).json({
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

exports.updateMobile = async (req, res) => {
  try {
    const mobileUpdate = await mobileModel.findByIdAndUpdate(
      req.params.mobileId,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "successfully update",
      data: {
        mobileUpdate,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deleteMobile = async (req, res) => {
  try {
    await mobileModel.findByIdAndDelete(req.params.mobileId);
    res.status(200).json({
      status: "success",
      message: "mobile delete",
    });
  } catch (err) {
    res.status(400).json({
      status: "unSuccess",
      message: err,
    });
  }
};
