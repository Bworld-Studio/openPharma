var express = require("express");
var router = express.Router();

const Client = require("../models/Client");

// Get all Clients
router.get("/clients", (req, res) => {
	Client.findAll().then(clients => {
		res.json(clients)
	})
		.catch(err => {
			res.send("Error: " + err)
		})
});

// Add Client
router.post("/client", (req, res) => {
	if (!req.body.numSS) {
		res.status(400);
		res.json({ error: "Bad Data" });
	} else {
		Client.create(req.body).then(() => {
			res.send("Client Added")
		})
			.catch(err => {
				res.send("error: " + err)
			})
	}
});

// Delete Client
router.delete("/client/:uuid", (req, res) => {
	Client.destroy({
		where: {
			uuid: req.params.uuid
		}
	})
		.then(() => {
			res.send("Client deleted")
		})
		.catch(err => {
			res.send("Error: " + err)
		})
});

// Update Client
router.put("/client/:uuid", (req, res) => {
	if (!req.body.numSS) {
		res.status(400);
		res.json({
			error: "Bad Data"
		})
	} else {
		Client.update(
			req.body,
			{ where: { uuid: req.params.uuid } }
		)
			.then(() => {
				res.send("Task Updated")
			})
			.error(err => res.send(err))
	}
})
// router.update("/Client/:uuid", (req, res) => {
// 	Client.update(req.body, {
// 		where: { uuid: req.params.uuid }
// 	})
// 		.then(num => {
// 			if (num == 1) {
// 				res.send({
// 					message: "Client was updated successfully."
// 				});
// 			} else {
// 				res.send({
// 					message: `Cannot update Client with id=${uuid}. Maybe Client was not found or req.body is empty!`
// 				});
// 			}
// 		})
// 		.catch(err => {
// 			res.status(500).send({
// 				message: "Error updating Client with id=" + uuid
// 			});
// 		});
// });

module.exports = router;