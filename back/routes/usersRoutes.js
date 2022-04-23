const express = require("express");
const usersControllers = require("../controllers/usersController");

const router = express.Router();

router.route("/").get(usersControllers.getUsers).post(usersControllers.signUp);
router.route("/login").post(usersControllers.login);

module.exports = router;
