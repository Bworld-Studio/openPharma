const Sequelize = require("sequelize");
const dbA = require("../data/dbA.js");

module.exports = dbA.sequelize.define(
	"client",
	{
		uuid: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		numSS: { type: Sequelize.STRING(13) },
		cleSS: { type: Sequelize.INTEGER(2) },
		lastName: { type: Sequelize.STRING },
		firstName: { type: Sequelize.STRING },
		birthDate: { type: Sequelize.DATEONLY },
		active: { type: Sequelize.BOOLEAN }
	}
);