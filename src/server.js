const express = require('express')
// const bodyParser = require('body-parser')
const pjson = require('../package.json')

const cors = require('cors')
const corsOptions = { origin: 'http://localhost:3000' }

const app = express()	// Application creation

app.use(cors(corsOptions))

// app.use(bodyParser.json())	// Parse requests of content-type - application/json
// app.use(bodyParser.urlencoded({ extended: false }))	// Parse requests of content-type - application/x-www-form-urlencoded

require('../src/routes/routes')(app) // Declare API Routes

const port = 3000
app.listen(port, function() {
	console.log( pjson.name + '@' + pjson.version + ' running on port ' + port)
})

// #44 Passer openpharma en https
// Set port, listen for requests in HTTPS, see: Passer openpharma en https #44 (https://github.com/Bworld-Studio/openpharma/issues/44)
// https.createServer({
// 	key: fs.readFileSync('key.prem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app).listen(443)

// const fs = require('fs')
// const common = require('./common/common')

// let date = common.getTimeStramp()
// let logFile = '.logs//server_'+date+'.log'

// fs.writeFile(logFile)

// const fastify = require('fastify')({
// 	logger: {
// 		level: 'info',
// 		file: logFile // Will use pino.destination()
// 	}
// })
// const pjson = require('./package.json')

// // Set a GET route "/"
// fastify.register(require('./routes/common'))
// fastify.register(require('./routes/clients'))
// // fastify.register(require('./routes/orders'))
// // fastify.register(require('./routes/products'))
// // fastify.register(require('./routes/template'))
// // fastify.register(require('./routes/updates'))

// fastify.listen(3000, function (err, address) { // eslint-disable-line no-unused-vars
// 	if (err) {
// 		fastify.log.error(err)
// 		process.exit(1) // eslint-disable-line no-undef
// 	}
// 	fastify.log.info( pjson.name + '@' + pjson.version + ' running on port 3000')
// })