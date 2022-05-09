const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  meter: {
    type: Number,
    required: true,
    min: [true, "meter not allowd lower 0"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collections",
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can not  lower 0"],
  },
  location: {
    type: {
      type: String,
      enum: "Point",
      default: "Point"
    },
    coordinates: {
      type: [Number],
    },
  },
  image: {
    type: String,
  },
  explatations: {
    type: String,
    trim: true,
    minLength: [20, "explatations can not lower 20 characters"],
  },
});

const homeModel = mongoose.model("home", homeSchema);

module.exports = homeModel;
