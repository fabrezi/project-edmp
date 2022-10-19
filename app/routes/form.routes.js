const multer = require("multer");

const upload = multer({
  dest: process.env.TEMP_FILE_DIR
});

module.exports = app => {
  const forms = require("../controllers/form.controller.js");

  var router = require("express").Router();

  // Create a new Form
  router.post("/", upload.single("productImg"), forms.create);

  // Retrieve all Forms
  router.get("/", forms.findAll);

  // Retrieve a single Form with id
  router.get("/:id", forms.findOne);

  // Update a Form with id
  router.put("/:id", upload.single("productImg"), forms.update);

  // Delete a Form with id
  router.delete("/:id", forms.delete);

  // Delete all Forms
  router.delete("/", forms.deleteAll);

  app.use("/api/forms", router);
};
