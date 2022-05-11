const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  kilometer: {
    type: String,
  },
  color: {
    type: String,
  },
  image: {
    type: String,
  },
  explatations: {
    type: String,
    minlength: [],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collections",
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

carSchema.pre("save", function (next) {
  this.createdAt = new Date(this.createdAt).getTime();
  next();
});

carSchema.pre(/^find/, function (next) {
  this.find({ activePost: { $ne: false } });
  next();
});

const carModel = mongoose.model("Car", carSchema);

module.exports = carModel;
