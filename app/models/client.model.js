module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define("client", {
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