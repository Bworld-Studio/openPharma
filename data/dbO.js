const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'dbo'

// Create a new MongoClient
const client = new MongoClient(url)

// Use connect method to connect to the Server
client.connect(function(err) {
	assert.equal(null, err)
	console.log('Connected successfully to server')

	const dbO = client.db(dbName)

	client.close()
})