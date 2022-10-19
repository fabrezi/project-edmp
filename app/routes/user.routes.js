module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // // Create a new user
  // router.post("/", users.create);

  // Retrieve users based on query criteria
  router.get("/search", users.search);

  // Go to the next page of results
  router.get("/nextLink", users.nextLink);

  // // Retrieve a single user with id
  // router.get("/:id", users.findOne);

  // // Update a user with id
  // router.put("/:id", upload.single("productImg"), users.update);

  // // Delete a user with id
  // router.delete("/:id", users.delete);

  // // Delete all users
  // router.delete("/", users.deleteAll);

  // // Retrieve a Picture by name
  // router.get("/photos/:name", users.findOnePhoto);

  app.use("/api/users", router);
};
