module.exports = app => {
  const clients = require("../controllers/client.controller.js");
  var router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  // Retrieve all Clients
  router.get("/", clients.findAll);

  // Retrieve all published Clients
  router.get("/active", clients.findAllActive);

  // Retrieve a single Client with id
  router.get("/:uuid", clients.findOne);

  // Update a Client with id
  router.put("/:uuid", clients.update);

  // Delete a Client with id
  router.delete("/:uuid", clients.delete);

  // Create a new Client
  router.delete("/", clients.deleteAll);

  app.use('/api/clients', router);
};