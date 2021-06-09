const Sequelize = require('sequelize')
const dbG = require('../plugins/postgre-connector')

const clients = dbG.sequelize.define('clients', {
	uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
	numSS: { type: Sequelize.STRING(13) },
	cleSS: { type: Sequelize.SMALLINT },
	lastName: { type: Sequelize.STRING },
	firstName: { type: Sequelize.STRING },
	birthDate: { type: Sequelize.DATEONLY },
	address: { type: Sequelize.STRING },
	address2: { type: Sequelize.STRING },
	city: { type: Sequelize.STRING },
	zipcode: { type: Sequelize.STRING },
	cellphone: { type: Sequelize.STRING },
	phone: { type: Sequelize.STRING },
	center: { type: Sequelize.STRING },
	viewAt: { type: Sequelize.DATE },
	active: { type: Sequelize.BOOLEAN }
},
{ freezeTableName: true })

// const getClients = async () => {
// 	console.log('getClients')
// }

// const searchClients = async () => {

// }

// const getClient = async (params) => {

// 	// Client.findByPk(params.uuid)
// 	// 	.then(client => { res.json(client) })
// 	// 	.catch(err => { res.send('Error: ' + err) })
// }

// const createClient = async () => {

// }

// const updateClient = async () => {

// }

// const updateLastViewClient = async () => {

// }

// const deactivateClient = async () => {

// }

module.exports = {
	clients,
	// getClients,
	// getClient,
	// searchClients,
	// createClient,
	// updateClient,
	// updateLastViewClient,
	// deactivateClient
}