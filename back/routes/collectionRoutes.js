const express = require("express");
const collectionControllers = require("../controllers/collectionController");

const router = express.Router();

router
  .route("/")
  .get(collectionControllers.getCollections)
  .post(collectionControllers.createCollection);

module.exports = router;
