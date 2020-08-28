const Sequelize = require('sequelize')
const sequelize = new Sequelize('dba', 'root', 'metal', {
	host: 'localhost',
	dialect: 'mariadb',
	dialectOptions: {
		// Your mariadb options here
		connectTimeout: 0
	},
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

const dbA = {}
dbA.sequelize = sequelize
dbA.Sequelize = Sequelize

sequelize.sync({ alter: true })		// Synchronize models with DB

module.exports = dbA