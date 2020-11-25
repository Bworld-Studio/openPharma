const express = require('express')
const router = express.Router()

const Template = require('../models/Template')

// Get orders
router.get('/template', (req, res) => {
	Template.findAll()
		.then(orders => { res.json(orders) })
		.catch(err => { res.send('Error: ' + err) })
})

// Add Client
router.post('/template', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	if (!req.body.numSS) {
		res.status(400)
		res.json({ error: 'Bad Data' })
	} else {
		Template.create(req.body)
			.then(() => { res.send('Order added') })
			.catch(err => { res.send('error: ' + err) })
	}
})

// Get Client
router.get('/template/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// Template.findByPk(req.params.uuid)
	// 	.then(client => { res.json(client) })
	// 	.catch(err => { res.send('Error: ' + err) })
})

// Delete Client
// router.delete("/clients/:uuid", (req, res) => {
// 	Template.destroy({
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
router.put('/template/:id', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	// if (!req.body.numSS) {
	// 	res.status(400)
	// 	res.json({
	// 		error: 'Bad Data'
	// 	})
	// } else {
	// 	Template.update(
	// 		req.body,
	// 		{ where: { uuid: req.params.uuid } }
	// 	)
	// 		.then(() => { res.send('Task Updated') })
	// 		.error(err => res.send(err))
	// }
})

module.exports = router