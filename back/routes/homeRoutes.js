const express = require("express");
const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const multer = require("multer");

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
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
      file.mimetype == "image/jpg"
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
  .post(
    authController.protect,
    upload.single("image"),
    homeController.createHome
  )
  .get(homeController.getHomes);

router
  .route("/:homeId")
  .get(homeController.getHome)
  .delete(authController.protect, homeController.deleteHome)
  .patch(authController.protect, homeController.updateHome);

module.exports = router;
