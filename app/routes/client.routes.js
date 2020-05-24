module.exports = app => {
  const clients = require("../controllers/client.controller.js");
  var router = require("express").Router();

  // Create a new Client
  router.post("/", clients.create);

  // Retrieve all Clients
  router.get("/", clients.findAll);

  // Retrieve all published Clients
  router.get("/published", clients.findAllPublished);

  // Retrieve a single Client with id
  router.get("/:id", clients.findOne);

  // Update a Client with id
  router.put("/:id", clients.update);

  // Delete a Client with id
  router.delete("/:id", clients.delete);

  // Create a new Client
  router.delete("/", clients.deleteAll);

  app.use('/api/clients', router);
};