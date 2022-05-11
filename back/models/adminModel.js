const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin"],
  },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
