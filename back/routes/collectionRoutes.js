const express = require("express");
const collectionControllers = require("../controllers/collectionController");

const router = express.Router();

router
  .route("/")
  .get(collectionControllers.getCollections)
  .post(collectionControllers.createCollection);

router
  .route("/:collectionId")
  .delete(collectionControllers.deleteCollection)
  .get(collectionControllers.getCollection)
  .patch(collectionControllers.updateCollection);

module.exports = router;
