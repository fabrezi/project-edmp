module.exports = app => {
  const stewards = require("../controllers/steward.controller.js");

  var router = require("express").Router();

  // Create a new Data Steward
  router.post("/", stewards.create);

  // Retrieve all Data Stewards
  router.get("/", stewards.findAll);

  // Retrieve all published Data Stewards
  router.get("/published", stewards.findAllPublished);

  // Retrieve a single Data Steward with id
  router.get("/:id", stewards.findOne);

  // Update a Data Steward with id
  router.put("/:id", stewards.update);

  // Delete a Data Steward with id
  router.delete("/:id", stewards.delete);

  // Delete all Data Stewards
  router.delete("/", stewards.deleteAll);

  app.use("/api/stewards", router);
};
