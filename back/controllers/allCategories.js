const mobileModel = require("../models/mobileModel");
const collectionModel = require("../models/collectionModel");

exports.getAllCategories = async (req, res) => {
  try {
    const collections = await collectionModel.find({});
    const mobiles = await mobileModel
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .then((products) => {
        return products[0];
      });
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
