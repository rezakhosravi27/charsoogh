const express = require("express");
const allCategories = require("../controllers/allCategories");

const router = express.Router();

router.route("/").get(allCategories.getAllCategories);

module.exports = router;
