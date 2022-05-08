const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

collectionSchema.pre(/^find/, function (next) {
  next();
});

collectionSchema.virtual("mobiles", {
  ref: "Mobiles",
  localField: "_id",
  foreignField: "parent",
});

const collectionModel = mongoose.model("Collections", collectionSchema);

module.exports = collectionModel;
