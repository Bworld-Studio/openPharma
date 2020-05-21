const dbA = require("../models");
const Client = dbA.client;
const Op = dbA.Sequelize.Op;

// Create and Save a new Client.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Client
  const client = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
	
};

// Find a single Client with an id.
exports.findOne = (req, res) => {
	
};

// Update a Client by the id in the request.
exports.update = (req, res) => {
	
};

// Delete a Client with the specified id in the request.
exports.delete = (req, res) => {
	
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
	
};

// Find all published Clients
exports.findAllPublished = (req, res) => {
	
};