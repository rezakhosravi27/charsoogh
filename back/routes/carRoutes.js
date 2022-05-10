const express = require("express");
const carControllers = require("../controllers/carController");
const multer = require("multer");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename =
      Date.now() + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), carControllers.createCar)
  .get(carControllers.getCars);
  
router
  .route("/:carId")
  .get(carControllers.getCar)
  .delete(carControllers.deleteCar)
  .patch(carControllers.updateCar);

module.exports = router;
