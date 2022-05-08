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

exports.getCollection = async (req, res) => {
  try {
    const collection = await collectionModel.findById(req.params.collectionId);
    if (!collection) {
      return res.status(404).json({
        status: "unSuccess",
        message: "collection not found ",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        collection,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const collectionUpdate = await collectionModel.findByIdAndUpdate(
      req.params.collectionId,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "successfully update",
      data: {
        collectionUpdate,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    await collectionModel.findByIdAndDelete(req.params.collectionId);
    res.status(200).json({
      status: "success",
      message: "collection delete",
    });
  } catch (err) {
    res.status(400).json({
      status: "unSuccess",
      message: err,
    });
  }
};
