const express = require('express')
const router = express.Router()

const BDPM = require('../files/bdpm')

router.put('/updates', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	console.log('Update file: '+ req.body.file )
	BDPM.downloadFiles(req.body.file)
})

module.exports = router