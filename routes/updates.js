const express = require('express')
const router = express.Router()

const BDPM = require('../files/bdpm')

router.put('/updates', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	console.log('updates: ' + req )
	BDPM.downloadFiles(req)
	// console.log(BDPM)
	// BDPM
	// .findAll().then(clients => {
	// 	res.json(clients)
	// })
	// .catch(err => {
	// 	res.send("Error: " + err)
	// })
})

module.exports = router