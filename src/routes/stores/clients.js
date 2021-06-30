
// const { Op } = require('sequelize')
// const Client = require('../../../models/Client')
// const clientService = require('../../../services/clients')

// Get all Clients
const getClients = async () => {
	console.log('getClients')
}

const searchClients = async () => {

}

// eslint-disable-next-line no-unused-vars
const getClient = async (params) => {

	// Client.findByPk(params.uuid)
	// 	.then(client => { res.json(client) })
	// 	.catch(err => { res.send('Error: ' + err) })
}

const createClient = async () => {

}

const updateClient = async () => {

}

const updateLastViewClient = async () => {

}

const deactivateClient = async () => {

}

module.exports = {
	getClients,
	getClient,
	searchClients,
	createClient,
	updateClient,
	updateLastViewClient,
	deactivateClient
}