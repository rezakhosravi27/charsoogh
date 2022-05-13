const express = require("express");
const adminControllers = require("../controllers/adminController");

const router = express.Router();

router.route("/").post(adminControllers.createAdmin);
router.route("/login").post(adminControllers.loginAdmin);
router.route("/homes").get(adminControllers.getHomes);
router
  .route("/homes/:homesId")
  .patch(adminControllers.protectAdmin, adminControllers.activeHomePost)
  .delete(adminControllers.protectAdmin, adminControllers.deActiveHomePost);

router.route("/cars").get(adminControllers.getCars);
router
  .route("/cars/:carId")
  .patch(adminControllers.protectAdmin, adminControllers.activeCarPost)
  .delete(adminControllers.protectAdmin, adminControllers.deActiveCarPost);

router.route("/mobiles").get(adminControllers.getMobiles);
router
  .route("/mobiles/:mobileId")
  .patch(adminControllers.protectAdmin, adminControllers.activeMobilePost)
  .delete(adminControllers.protectAdmin, adminControllers.deActiveMobilePost);

router.route("/users").get(adminControllers.getUsers);
router
  .route("/users/:userId")
  .patch(adminControllers.protectAdmin, adminControllers.userState);

module.exports = router;
