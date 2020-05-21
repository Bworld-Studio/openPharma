module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define("client", {
		guid: {
			type: Sequelize.STRING
		},
		numSS: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		firstName: {
			type: Sequelize.STRING
		}
	});

	return Client;
};