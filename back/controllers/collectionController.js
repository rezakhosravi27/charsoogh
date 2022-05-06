const collectionModel = require("../models/collectionModel");
const collectioModel = require("../models/collectionModel");

exports.createCollection = async (req, res) => {
  try {
    const collection = await collectioModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        collection,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "unsuccess",
      message: err,
    });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await collectionModel.find().select("name id");
    res.status(200).json({
      status: "success",
      data: {
        collections,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unsuccess",
      message: err,
    });
  }
};
