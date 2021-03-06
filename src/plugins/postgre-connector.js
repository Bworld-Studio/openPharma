const Sequelize = require('sequelize')
const sequelize = new Sequelize('dbg', 'postgres', 'metal', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
	dialectOptions: {
		connectTimeout: 0
	},
	operatorsAliases: 0,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

const dbG = {}
dbG.sequelize = sequelize
dbG.Sequelize = Sequelize

sequelize.sync({ alter: true })		// Synchronize models with DB

module.exports = dbG