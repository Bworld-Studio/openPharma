const express = require('express')
const router = express.Router()

const BDPM = require('../models/BDPM')
// const BdM_IT = require('../models/BdM_IT')

// Get all Products
router.get('/products', (req, res) => {
	BDPM.findAll().then(products => {
		res.json(products)
	})
		.catch(err => {
			res.send('Error: ' + err)
		})
})
// Get from product
router.get('/products/:cip', (req, res) => {
	BDPM
		.findOne({ where: {cip: req.body.cip},})
		.then(product => { res.json(product) })
		.catch(err => { res.send('Error: ' + err) })
})
// Add Client
router.post('/products', (req, res) => {
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		BDPM
			.create(req.body).then(() => { res.send('Product Added')})
			.catch(err => { res.send('error: ' + err) })
	}
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
		BDPM.update(
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