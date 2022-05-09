const homeModel = require("../models/homeModel");

exports.createHome = async (req, res) => {
  try {
    const homeData = {
      ...req.body,
      parent: "6278ea238b0696cfbddfdc77",
      location: {
        type: req.body.location.type,
        coordinates: req.body.location.coordinates,
      },
      image:
        req.protocol + "://" + req.get("host") + "/public/" + req.file.filename,
    };
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
