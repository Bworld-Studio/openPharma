const express = require('express')
const router = express.Router()

const bdpm = require('../files/bdpm')

router.put('/updates', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	console.log('Update file: '+ req.body.file )
	bdpm.updateFile(req.body.file)
})

module.exports = router