const Sequelize = require('sequelize')
const dbG = require('../data/dbG.js')

const cis = dbG.sequelize.define('cis', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	labelMed: { type: Sequelize.TEXT },
	pharmaForm: { type: Sequelize.STRING },
	medRoute: { type: Sequelize.STRING },
	adminStatus: { type: Sequelize.STRING(30) },
	procedureType: { type: Sequelize.STRING(50) },
	commercialState: { type: Sequelize.STRING(20) },
	aamDate: { type: Sequelize.DATEONLY },
	bdmStatus: { type: Sequelize.STRING },
	numEUAuth: { type: Sequelize.STRING },
	holder: { type: Sequelize.STRING },
	reinforcedMonitoring: { type: Sequelize.STRING }
}, {
	freezeTableName: true
})

const cip = dbG.sequelize.define('cip', { // eslint-disable-line no-alert, no-unused-vars
	cip7: { type: Sequelize.INTEGER(7), primaryKey: true },
	cip13: { type: Sequelize.BIGINT(13) },
	cis: { type: Sequelize.INTEGER(8) },
	label: { type: Sequelize.TEXT },
	adminStatus: { type: Sequelize.STRING(30) },
	commercialState: { type: Sequelize.STRING(100) },
	commercialDate: { type: Sequelize.DATEONLY },
	reimbursementRate: { type: Sequelize.INTEGER(4) },
	priceTTC: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementAmount: { type: Sequelize.DECIMAL(10, 2) },
	priceHD: { type: Sequelize.DECIMAL(10, 2) },
	reimbursementText: { type: Sequelize.TEXT }
}, {
	freezeTableName: true
})

const compo = dbG.sequelize.define('compo', { // eslint-disable-line no-alert, no-unused-vars
	id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true },
	cis: { type: Sequelize.INTEGER(8) },
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

const gener = dbG.sequelize.define('gener', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	id: { type: Sequelize.INTEGER(4), primaryKey: true },
	label: { type: Sequelize.TEXT },
	type: { type: Sequelize.INTEGER(2) },
	sort: { type: Sequelize.INTEGER(2) },
}, {
	freezeTableName: true
})

const cpd = dbG.sequelize.define('cpd', { // eslint-disable-line no-alert, no-unused-vars
	cis: { type: Sequelize.INTEGER(8), primaryKey: true },
	condition: { type: Sequelize.STRING(1000), primaryKey: true },
}, {
	freezeTableName: true
})

module.exports = {
	cis,
	cip,
	compo,
	gener,
	cpd
}