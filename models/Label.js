const Sequelize = require("sequelize");
const dbA = require("../data/dbA.js");

module.exports = dbA.sequelize.define(
	"label",
	{
		code: { type: Sequelize.STRING(15), primaryKey: true },
		langu: { type:Sequelize.STRING(2) },
		label: { type:Sequelize.STRING }
	},
)