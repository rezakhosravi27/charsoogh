const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  meter: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "price can not  lower 0"],
  },
  explatations: {
      type: String, 
      trim: true, 
      minLength: [20, "explatations can not lower 20 characters"]
  }
});
