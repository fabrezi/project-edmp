module.exports = app => {
  const classifications = require("../controllers/classification.controller.js");

  var router = require("express").Router();

  // Create a new Datatype
  router.post("/", classifications.create);

  // Retrieve all Datatypes
  router.get("/", classifications.findAll);

  // Retrieve all published Datatypes
  router.get("/published", classifications.findAllPublished);

  // Retrieve a single Datatype with id
  router.get("/:id", classifications.findOne);

  // Update a Datatype with id
  router.put("/:id", classifications.update);

  // Delete a Datatype with id
  router.delete("/:id", classifications.delete);

  // Delete all Datatypes
  router.delete("/", classifications.deleteAll);

  app.use("/api/classifications", router);
};
