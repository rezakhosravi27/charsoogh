const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is must requiered"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must have unique"],
    trim: true,
    validate: [validator.isEmail, "email format not correct"],
  },
  phoneNumber: {
    type: String,
    minlength: [11, "phone number must have 10 numbers"],
    maxlength: [13, "phone number must not have grather than 13 numbers"],
    unique: true,
    required: [true, "phone number must have completed"],
  },
  age: {
    type: Number,
    required: [true, "age must have completed"],
  },
  password: {
    type: String,
    required: [true, "password must required"],
    minlength: [5, "password must have 5 numbers"],
    maxlength: [20, "password must not have grather than 20 numbers"],
    trim: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "password must required"],
    minlength: [5, "password must have 5 numbers"],
    maxlength: [20, "password must not have grather than 20 numbers"],
    trim: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "confirm password must same password",
    },
  },
  resetPassword: String,
  expireResetPasswordToken: Date,
});

// delete confirm password
usersSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

usersSchema.methods.generateResetPasswordToken = function () {
  const resetPassword = crypto.randomBytes(32).toString("hex");
  this.resetPassword = crypto
    .createHash("sha256")
    .update(resetPassword)
    .digest("hex");

  return resetPassword;
};

usersSchema.methods.comparePassword = async (userPass, dbPass) => {
  return await bcrypt.compare(userPass, dbPass);
};

const usersModel = mongoose.model("Users", usersSchema);

module.exports = usersModel;
