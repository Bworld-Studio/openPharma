const express = require('express')
const router = express.Router()

const { Op } = require('sequelize')

const Client = require('../../models/Client')
// const clients = require('../stores/clients')
// const clientService = require('../../../services/clients')

// Get all Clients
router.get('/clients', (req, res) => {
	// console.log(req.query)
	let search = req.query.search
	if ( search != undefined ) {	// Search API
		let query = {
			[Op.or]: [
				{ numSS: { [Op.like]: search + '%' } },
				{ lastName: { [Op.like]: search + '%' } },
				{ firstName: { [Op.like]: search + '%' } }
			]
		}
		Client.clients.findAll( { where: query } )
			.then(clients => {
				res.json(clients)
				// console.log(res.j)
			})
			.catch(err => { res.send('Error: ' + err) })
	}
	else {
		Client.clients.findAll()
			.then(clients => {
				console.log(clients)
				res.json(clients)
			})
			.catch(err => { res.send('Error: ' + err) })
	}
})

// Add Client
router.post('/clients', (req, res) => {
	console.log(req.body)
	if (req.body.numSS == '') {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		let client = req.body
		console.log(client)
		// client.birthDate.toString()
		client.viewAt = new Date()
		Client.clients.create(client)
			.then(res => {
				res.send('Client Added')
			})
			.catch(err => {
				res.send('error: ' + err)
			})
	}
})

// Get Client
router.get('/clients/:uuid', (req, res) => {
	Client.clients.findByPk(req.params.uuid)
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
	if (!req.body) {
		res.status(400)
		res.json({
			error: 'Bad Data'
		})
	} else {
		Client.clients.update(
			req.body,
			{ where: { uuid: req.params.uuid } }
		)
			.then(() => { res.send('Task Updated') })
			.error(err => res.send(err))
	}
})

module.exports = router