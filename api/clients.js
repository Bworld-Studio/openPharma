const express = require('express')
const router = express.Router()
const Client = require('../models/Client')

// Get all Clients
router.get('/clients', (req, res) => {
	Client.findAll()
		.then(clients => { res.json(clients) })
		.catch(err => { res.send('Error: ' + err) })
})

// Add Client
router.post('/clients', (req, res) => {
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		Client.create(req.body)
			.then(() => { res.send('Client Added') })
			.catch(err => { res.send('error: ' + err) })
	}
})

// Get Client
router.get('/clients/:uuid', (req, res) => {
	Client.findByPk(req.params.uuid)
		.then(client => { res.json(client) })
		.catch(err => { res.send('Error: ' + err) })
})

// Delete Client
// router.delete("/clients/:uuid", (req, res) => {
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
router.put('/clients/:uuid', (req, res) => {
	if (!req.body.numSS) {
		res.status(400)
		res.json({
			error: 'Bad Data'
		})
	} else {
		Client.update(
			req.body,
			{ where: { uuid: req.params.uuid } }
		)
			.then(() => { res.send('Task Updated') })
			.error(err => res.send(err))
	}
})

module.exports = router