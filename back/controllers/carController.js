const carModel = require("../models/carModel");

exports.createCar = async (req, res) => {
  console.log(req.headers.authorization);
  const url = req.protocol + "://" + req.get("host");
  try {
    const carData = {
      ...req.body,
      parent: "627a3274b143a228bbd2d183",
      image: url + "/public/" + req.file.filename,
    };
    const car = await carModel.create(carData);
    res.status(201).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.carId);
    if (!car) {
      return res.status(404).json({
        status: "unSuccess",
        message: "car not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await carModel.findByIdAndDelete(req.params.carId);
    if (!car) {
      return res.status(404).json({
        status: "unSuccess",
        message: "car not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "car delete",
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await carModel.findByIdAndUpdate(req.params.carId, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({
        status: "unSuccess",
        message: "car not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        car,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "unSuccess",
      message: err,
    });
  }
};
