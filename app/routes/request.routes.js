const { route } = require("express/lib/application");

module.exports = app => {
  const requests = require("../controllers/request.controller.js");

  var router = require("express").Router();

  router.get("/", requests.findAll);

  router.get("/findAndSave", requests.findAndSaveRequests);

  router.put("/event", requests.updateEventRequests);

  router.post("/save", requests.saveRequestWithProduct);

  router.get("/product", requests.loadProducts)

  app.use("/api/requests", router);
};
