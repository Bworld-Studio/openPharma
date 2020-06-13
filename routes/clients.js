var express = require("express")
var router = express.Router()

const Client = require("../models/Client")

// Get all Clients
router.get("/clients", (req, res) => {
	Client.findAll()
	.then(clients => {
		res.json(clients)
	})
	.catch(err => {
		res.send("error: " + err)
	})
})