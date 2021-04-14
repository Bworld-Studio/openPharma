const express = require('express')
const router = express.Router()

const bdpm = require('../../../apis/bdpm/bdpm')
const BDPM = require('../../../models/BDPM')

router.put('/updates', (req, res) => { // eslint-disable-line no-alert, no-unused-vars
	console.log('Update file: '+ req.body.file )
	bdpm.updateFiles(req.body.file)
})

router.get('/updates/:file', (req, res) => {
	BDPM.bdpm_updates.findByPk(req.params.file)
		.then(ts => { res.json(ts) })
		.catch(err => { res.send('Error: ' + err) })
})

module.exports = router