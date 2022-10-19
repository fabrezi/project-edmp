module.exports = app => {
  const datatypes = require("../controllers/datatype.controller.js");

  var router = require("express").Router();

  // Create a new Datatype
  router.post("/", datatypes.create);

  // Retrieve all Datatypes
  router.get("/", datatypes.findAll);

  // Retrieve all published Datatypes
  router.get("/published", datatypes.findAllPublished);

  // Retrieve a single Datatype with id
  router.get("/:id", datatypes.findOne);

  // Update a Datatype with id
  router.put("/:id", datatypes.update);

  // Delete a Datatype with id
  router.delete("/:id", datatypes.delete);

  // Delete all Datatypes
  router.delete("/", datatypes.deleteAll);

  app.use("/api/datatypes", router);
};
