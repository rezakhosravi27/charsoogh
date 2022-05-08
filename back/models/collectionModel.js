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

collectionSchema.virtual("mobiles", {
  ref: "Mobiles",
  localField: "_id",
  foreignField: "parent",
});

collectionSchema.pre(/^find/, function (next) {
  this.populate("mobiles");
  next();
});

const collectionModel = mongoose.model("Collections", collectionSchema);

module.exports = collectionModel;
