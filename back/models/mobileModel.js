const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be completed"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "model must be completed"],
    trim: true,
  },
  color: {
    type: String,
    required: [true, "color must be completed"],
    trim: true,
  },
  ram: {
    type: Number,
    required: true,
    min: [1, "ram not lower 1"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price not lower 0"],
  },
  expletations: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collections",
    required: [true, "parent of mobiles must be required"],
  },
});

const mobileModel = mongoose.model("Mobiles", mobileSchema);

module.exports = mobileModel;
