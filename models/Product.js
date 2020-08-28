const Sequelize = require('sequelize')
const dbA = require('../data/dbA.js')

const BDPM_Cis = dbA.sequelize.define('BDPM_Cis', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	labelMed: { type: Sequelize.TEXT },
	pharmaForm: { type: Sequelize.STRING },
	medRoute: { type: Sequelize.STRING },
	adminStatus: { type: Sequelize.STRING(30) },
	procedureType: { type: Sequelize.STRING(50) },
	commercialState: { type: Sequelize.STRING(20) },
	aamDate: { type: Sequelize.DATEONLY },
	bdmStatus: { type: Sequelize.STRING },
	numEUAuth: { type: Sequelize.STRING(11) },
	holder: { type: Sequelize.STRING },
	reinforcedMonitoring: { type: Sequelize.STRING }
}, {
	freezeTableName: true
})

const BDPM_Cip = dbA.sequelize.define('BDPM_Cip', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8) },
	cip7: { type: Sequelize.INTEGER(7), primaryKey: true },
	cip13: { type: Sequelize.INTEGER(13) },
	label: { type: Sequelize.TEXT },
	adminStatus: { type: Sequelize.STRING(30) },
	commercialState: { type: Sequelize.STRING(40) },
	commercialDate: { type: Sequelize.DATEONLY },
	reimbursementRate: { type: Sequelize.DECIMAL(3, 2) },
	priceTTC: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementAmount: { type: Sequelize.DECIMAL(10, 2) },
	priceHD: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementText: { type: Sequelize.TEXT }
}, {
	freezeTableName: true
})

const BDPM_Compo = dbA.sequelize.define('BDPM_Compo', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	label: { type: Sequelize.TEXT },
	substanceID: { type: Sequelize.INTEGER(8) },
	substanceLabel: { type: Sequelize.TEXT },
	substanceDosage: { type: Sequelize.TEXT },
	reference: { type: Sequelize.STRING },
	nature: { type: Sequelize.STRING(2) },
	natureID: { type: Sequelize.INTEGER(3) },
}, {
	freezeTableName: true
})

const BDPM_Gener = dbA.sequelize.define('BDPM_Gener', { // eslint-disable-line no-alert, no-unused-vars
	id: { type: Sequelize.INTEGER(4), primaryKey: true },
	label: { type: Sequelize.TEXT },
	cis: { type: Sequelize.INTEGER(8) },
	type: { type: Sequelize.INTEGER(2) },
	sort: { type: Sequelize.INTEGER(2) },
}, {
	freezeTableName: true
})

const BDPM_Cpd = dbA.sequelize.define('BDPM_Cpd', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	condition: { type: Sequelize.STRING(1000) },
}, {
	freezeTableName: true
})

// module.exports

module.exports = {
	BDPM_Cis,
	BDPM_Cip,
	BDPM_Compo,
	BDPM_Gener,
	BDPM_Cpd
}