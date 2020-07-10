const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

// Get all Clients
router.get('/products', (req, res) => {
	Product.findAll().then(clients => {
		res.json(clients)
	})
		.catch(err => {
			res.send('Error: ' + err)
		})
})

// Add Client
router.post('/products', (req, res) => {
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		Product
			.create(req.body).then(() => { res.send('Product Added')})
			.catch(err => { res.send('error: ' + err) })
	}
})
router.get('/products/:cip', (req, res) => {
	Product
		.findOne({ where: {cip: req.body.cip},})
		.then(product => { res.json(product) })
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
router.put('/products/:cip', (req, res) => {
	if (!req.body.cip) {
		res.status(400)
		res.json({
			error: 'Bad Data'
		})
	} else {
		Product.update(
			req.body,
			{ where: { uuid: req.params.cip } }
		)
			.then(() => {
				res.send('Product updated')
			})
			.error(err => res.send(err))
	}
})

module.exports = router