var express = require("express");
var router = express.Router();

const Label = require("../models/Label");

// Get all Labels
router.get("/label", (req, res) => {
	Label.findAll().then(labels => {
		res.json(labels)
	})
		.catch(err => {
			res.send("Error: " + err)
		})
});

// Add Label
router.post("/labels", (req, res) => {
	if (!req.body.code) {
		res.status(400);
		res.json({ error: "Bad Data" });
	} else {
		Label.create(req.body).then(() => {
			res.send("Label Added")
		})
			.catch(err => {
				res.send("error: " + err)
			})
	}
});

// Delete Client
// router.delete("/labels/:uuid", (req, res) => {
// 	Client.destroy({
// 		where: {
// 			uuid: req.params.uuid
// 		}
// 	})
// 		.then(() => {
// 			res.send("Client deleted")
// 		})
// 		.catch(err => {
// 			res.send("Error: " + err)
// 		})
// });

// Update Client
// router.put("/labels/:uuid", (req, res) => {
// 	if (!req.body.numSS) {
// 		res.status(400);
// 		res.json({
// 			error: "Bad Data"
// 		})
// 	} else {
// 		Client.update(
// 			req.body,
// 			{ where: { uuid: req.params.uuid } }
// 		)
// 			.then(() => {
// 				res.send("Task Updated")
// 			})
// 			.error(err => res.send(err))
// 	}
// });

module.exports = router;