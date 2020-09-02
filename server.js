// const fs = require('fs')
// const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const corsOptions = { origin: 'http://localhost:3000' }

const app = express()	// Application creation

app.use(cors(corsOptions))

app.use(bodyParser.json())	// Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }))	// Parse requests of content-type - application/x-www-form-urlencoded

// MongoDB
// const MongoClient = require('mongodb').MongoClient
// const assert = require('assert')

// Connection URL
// const url = 'mongodb://localhost:27017'

// Database Name
// const dbName = 'dbo'

// Create a new MongoClient
// const client = new MongoClient(url)

// Use connect method to connect to the Server
// client.connect(function(err) {
// 	assert.equal(null, err)
// 	console.log('Connected successfully to server')

// 	const dbO = client.db(dbName)

// 	client.close()
// })

const clients = require('./routes/clients')
app.use('/api', clients)

// const Client = require('./routes/client')
// app.use('/api', Client)

const products = require('./routes/products')
app.use('/api', products)

const updates = require('./routes/updates')
app.use('/api', updates)

// Set port, listen for requests
// https.createServer({
// 	key: fs.readFileSync('key.prem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app).listen(443)

const port = 3000
app.listen(port, function() {
	console.log('Server started on port ' + port)
})