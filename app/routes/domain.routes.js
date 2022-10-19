module.exports = app => {
  const domains = require("../controllers/domain.controller.js");

  var router = require("express").Router();

  // Create a new Data Domain
  router.post("/", domains.create);

  // Get all Domain
  router.get("/", domains.findAll);

  // Retrieve a single Domain with id
  router.get("/:id", domains.findOne);

  // Update a Data Domain with id
  router.put("/:id", domains.update);

  // Delete a Data Domain with id
  router.delete("/:id", domains.delete);

  // Delete all domains
  router.delete("/", domains.deleteAll);

  app.use("/api/domains", router);
};