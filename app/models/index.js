const dbAConfig = require("../config/dbA.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbAConfig.DB, dbAConfig.USER, dbAConfig.PASSWORD, {
	host: dbAConfig.HOST,
	dialect: dbAConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbAConfig.pool.max,
		min: dbAConfig.pool.min,
		acquire: dbAConfig.pool.acquire,
		idle: dbAConfig.pool.idle
	}
});

const dbA = {};

dbA.Sequelize = Sequelize;
dbA.sequelize = sequelize;

dbA.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = dbA;