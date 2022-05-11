const express = require("express");
const usersControllers = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(usersControllers.getUsers).post(usersControllers.signUp);
router.route("/:userId").delete(usersControllers.deleteUser);
router.route("/login").post(usersControllers.login);
router.route("/forgotPassword").post(usersControllers.forgotPassword);
router.route("/forgotPassword/:token").post(usersControllers.resetPassword);

module.exports = router;
