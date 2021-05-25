const express = require('express')
const pjson = require('../package.json')

const app = express()	// Application creation

// CORS
// const cors = require('cors')
// const corsOptions = { origin: 'http://localhost:3000' }
// app.use(cors(corsOptions))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Absolute paths
global.base_dir = __dirname // eslint-disable-line no-undef
global.abs_path = function(path) {
	return base_dir + path // eslint-disable-line no-undef
}
global.include = function(file) {
	return require(abs_path('/' + file)) // eslint-disable-line no-undef
}

// Declare routes
require('../src/routes/routes')(app) // Declare API Routes

// Start Server
const port = 3000
app.listen(port, function() {
	console.log( pjson.name + '@' + pjson.version + ' running on port ' + port)
})

// #44 Passer openpharma en https
// Set port, listen for requests in HTTPS, see: Passer openpharma en https #44 (https://github.com/Bworld-Studio/openpharma/issues/44)

// const https = require('https')
// const fs = require('fs')

// const port = 3443

// const options = {
// 	key: fs.readFileSync('./key.pem'),
// 	cert: fs.readFileSync('./cert.pem'),
// 	passphrase: 'metal01'
// }

// https.createServer(options, app).listen(port, function() {
// 	console.log( pjson.name + '@' + pjson.version + ' running on port ' + port)
// })


// Fastify Server																								//

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