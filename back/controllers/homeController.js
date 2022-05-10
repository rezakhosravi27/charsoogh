const homeModel = require("../models/homeModel");

exports.createHome = async (req, res) => {
  try {
    const homeData = {
      ...req.body,
      parent: "6278ea238b0696cfbddfdc77",
      image:
        req.protocol + "://" + req.get("host") + "/public/" + req.file.filename,
    };
    console.log(homeData);
    const home = await homeModel.create(homeData);
    res.status(201).json({
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
    console.log(req.query);
    const homes = await homeModel.find(req.query);
    res.status(200).json({
      status: "success",
      result: homes.length,
      data: {
        homes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.getHome = async (req, res) => {
  try {
    const home = await homeModel.findById(req.params.homeId);
    if (!home) {
      return res.status(404).json({
        status: "unSuccess",
        message: "home not found",
      });
    }

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

exports.deleteHome = async (req, res) => {
  try {
    const home = await homeModel.findByIdAndDelete(req.params.homeId);
    if (!home) {
      return res.status(404).json({
        status: "unSuccess",
        message: "home not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "home deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.updateHome = async (req, res) => {
  try {
    const home = await homeModel.findByIdAndUpdate(
      req.params.homeId,
      req.body,
      {
        new: true,
      }
    );
    if (!home) {
      return res.status(404).json({
        status: "unSuccess",
        message: "home not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "home updated",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

