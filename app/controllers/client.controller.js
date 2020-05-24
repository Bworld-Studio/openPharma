const dbA = require("../models");
const Client = dbA.client;
const Op = dbA.Sequelize.Op;

// Create and Save a new Client.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.numSS) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Client
  const client = {
    guid: req.body.guid,
    numSS: req.body.numSS,
    lastName: req.body.lastName,
    firstName: req.body.firstName
  };

  // Save Client in the database
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
  const numSS = req.query.numSS;
  var condition = numSS ? { numSS: { [Op.like]: `%${numSS}%` } } : null;

  Client.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};

// Find a single Client with an id.
exports.findOne = (req, res) => {
  const guid = req.params.guid;

  Client.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Client with id=" + id
      });
    });
};

// Update a Client by the id in the request.
exports.update = (req, res) => {
  const numSS = req.params.numSS;

  Client.update(req.body, {
    where: { numSS: numSS }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

// Delete a Client with the specified id in the request.
exports.delete = (req, res) => {
  const guid = req.params.guid;

  Client.destroy({
    where: { guid: guid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Client with guid=${guid}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
      });
    });
};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
  Client.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clients."
      });
    });
};

// Find all published Clients
exports.findAllPublished = (req, res) => {
  Client.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving clients."
    });
  });
};