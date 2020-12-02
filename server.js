const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const corsOptions = { origin: 'http://localhost:3000' }

const app = express()	// Application creation

app.use(cors(corsOptions))

app.use(bodyParser.json())	// Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }))	// Parse requests of content-type - application/x-www-form-urlencoded

require('./routes')(app) // Declare API Routes

const port = 3000
app.listen(port, function() {
	console.log('Server started on port ' + port)
})

// Set port, listen for requests in HTTPS, see: Passer openpharma en https #44 (https://github.com/Bworld-Studio/openpharma/issues/44)
// https.createServer({
// 	key: fs.readFileSync('key.prem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app).listen(443)