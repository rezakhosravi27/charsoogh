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
  address: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can not  lower 0"],
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  explatations: {
    type: String,
    trim: true,
    minLength: [20, "explatations can not lower 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  activePost: {
    type: Boolean,
    default: false,
    select: false,
  },
});

homeSchema.pre("save", function (next) {
  this.createdAt = new Date(this.createdAt).getTime();
  next();
});

const homeModel = mongoose.model("Home", homeSchema);

module.exports = homeModel;
