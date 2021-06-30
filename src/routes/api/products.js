const express = require('express')
const router = express.Router()

const { Op } = require('sequelize')

const BDPM = require('../../models/BDPM')
// const BdM_IT = require('../models/BdM_IT')

// Get all Products
router.get('/products', (req, res) => {
	let search = req.query.search
	if ( search != undefined ) {	// Search API
		let query = {}
		if ( isNaN(search) ) { 			// Query with ID
			query = {
				labelMed: { [Op.like]: search + '%' }
			}
		} else {
			query = {
				cis: search
			}
		}
		BDPM.bdpm_cis.findAll( { where: query })
			.then(products => {
				res.json(products) })
			.catch(err => { res.send('Error: ' + err) })
	}
	else {
		BDPM.bdpm_cis.findAll()
			.then(products => { res.json(products) })
			.catch(err => { res.send('Error: ' + err) })
	}

})
// Get from product
router.get('/products/:cis', (req, res) => {
	BDPM.bdpm_cis
		.findByPk(req.params.cis)
		// .findOne({ where: {cis: req.body.cis},})
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


// Delete Product
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