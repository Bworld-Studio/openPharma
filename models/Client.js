const Sequelize = require('sequelize')
const dbG = require('../data/dbG.js')

module.exports = dbG.sequelize.define(
	'client',
	{
		uuid: {  type: Sequelize.STRING(13) },
		// uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
		numSS: { type: Sequelize.STRING(13) },
		cleSS: { type: Sequelize.INTEGER(2) },
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
)