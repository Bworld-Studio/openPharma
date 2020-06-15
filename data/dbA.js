const Sequelize = require("sequelize");
const dbA = {};
const sequelize = new Sequelize("dba", "root", "metal", {
	host: "localhost",
	dialect: "mariadb",
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

dbA.sequelize = sequelize;
dbA.Sequelize = Sequelize;

module.exports = dbA;