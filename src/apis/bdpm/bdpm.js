const urls = { // eslint-disable-line no-alert, no-unused-vars
	cis: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',
	cip: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt',				// eslint-disable-line no-alert, no-unused-vars
	compo: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	gener: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	cpd: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt'					// eslint-disable-line no-alert, no-unused-vars
}
const files = [
	{ name: 'cis', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'cip', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'compo', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'gener', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt', folder: '/bdpm/tmp'},
	{ name: 'cpd', url: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt', folder: '/bdpm/tmp'}
]

// const http = require('http')
const Fs = require('fs')
const Path = require('path')

// import Utils from ('../utils')
const { downloadFromURL } = require('../utils')
const BDPM = require('../../models/BDPM')
const Common = require('../../models/Common')

const uploadFileToDB = function(filename) {
	return new Promise((resolve, reject)=>{
		let timestamp = new Date()
		Fs.readFile(Path.join(__dirname, 'tmp', filename), 'latin1', (err, data) => {	// eslint-disable-line no-alert, no-undef
			if (err) {
				console.log(filename+': file reed')
				return reject(err)
			}
			if (!err) console.log(filename+ ': upload file to database')
			let array = []
			// BDPM cis file -- OK
			if ( filename === 'cis' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis:									convertValue(rowArray[0]),
							labelMed:							convertValue(rowArray[1]),
							pharmaForm:						convertValue(rowArray[2]),
							medRoute:							convertValue(rowArray[3]),
							adminStatus:					convertValue(rowArray[4]),
							procedureType:				convertValue(rowArray[5]),
							commercialState:			convertValue(rowArray[6]),
							aamDate:							convertDate(rowArray[7]),
							bdmStatus:						convertValue(rowArray[8]),
							numEUAuth:						convertValue(rowArray[9]),
							holder:								convertValue(rowArray[10]),
							reinforcedMonitoring:	convertValue(rowArray[11]),
						}
						array.push(line)
					}
				})
				BDPM.bdpm_cis.destroy({ truncate: true })
				BDPM.bdpm_cis.bulkCreate(array)
					.then(() => {
						console.log('CIS: update done')
						// BDPM.bdmp_updates.update({file: 'cis', timestamp: timestamp}).then().catch()
						resolve('CIS: update done')
					})
					.catch(err => { console.log('CIS: update error -->'+ err) })
				let update_log = {file: 'BDPM', timestamp: timestamp}
				Common.updates_logs.upsert(update_log).then( () => console.log('BDPM: Log Updated') ).catch( () => console.log('BDPM: Error updating the log'))
			}
			// CIP file -- OK
			if ( filename === 'cip' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cip7:									convertValue(rowArray[1]),
							cip13:								convertValue(rowArray[6]),
							cis:									convertValue(rowArray[0]),
							label:								convertValue(rowArray[2]),
							adminStatus:					convertValue(rowArray[3]),
							commercialState:			convertValue(rowArray[4]),
							commercialDate:				convertDate(rowArray[5]),
							reimbursementRate:		convertNumber(rowArray[8]),
							priceTTC:							convertAmount(rowArray[9]),
							reimbursementAmount:	convertAmount(rowArray[10]),
							priceHD:							convertAmount(rowArray[11]),
							reimbursementText:		convertValue(rowArray[12])
						}
						array.push(line)
					}
				})
				BDPM.bdpm_cip.destroy({ truncate: true })
				BDPM.bdpm_cip.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('CIP: update done')
						// BDPM.bdmp_updates.create({file: 'cip', timestamp: timestamp})
						resolve('CIP: update done')
					})
					.catch(err => { console.log('CIP: update error --> '+ err) })
			}
			// BDPM compo file -- ok
			if ( filename === 'compo' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis:							convertValue(rowArray[0]),
							label:						convertValue(rowArray[1]),
							substanceID:			convertValue(rowArray[2]),
							substanceDosage:	convertValue(rowArray[4]),
							substanceLabel:		convertValue(rowArray[3]),
							reference:				convertValue(rowArray[5]),
							nature:						convertValue(rowArray[6]),
							natureID:					convertValue(rowArray[7])
						}
						array.push(line)
					}
				})
				BDPM.bdpm_compo.destroy({ truncate: true })
				BDPM.bdpm_compo.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('COMPO: update done')
						// BDPM.bdmp_updates.create({file: 'compo', timestamp: timestamp})
						resolve('COMPO: update done')
					})
					.catch(err => { console.log('COMPO: update error --> '+ err) })
			}
			// BDPM gener file -- ok
			if ( filename === 'gener' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							id:			convertValue(rowArray[0]),
							label:	convertValue(rowArray[1]),
							cis:		convertValue(rowArray[2]),
							type:		convertValue(rowArray[3]),
							sort:		convertValue(rowArray[4]),
						}
						array.push(line)
					}
				})
				BDPM.bdpm_gener.destroy({ truncate: true })
				BDPM.bdpm_gener.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('GENER: update done')
						// BDPM.bdmp_updates.create({file: 'gener', timestamp: timestamp})
						resolve('GENER: update done')
					})
					.catch(err => { console.log('GENER: update error --> '+ err) })
			}
			// BDPM cpd file -- ok
			if ( filename === 'cpd' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis:				convertValue(rowArray[0]),
							condition:	convertValue(rowArray[1]),
						}
						array.push(line)
					}
				})
				BDPM.bdpm_cpd.destroy({ truncate: true })
				BDPM.bdpm_cpd.bulkCreate(array, { raw: true })
					.then(function() {
						console.log('CPD: update done')
						// BDPM.bdmp_updates.create({file: 'cpd', timestamp: timestamp})
						resolve('CPD: update done')
					})
					.catch(err => { console.log('CPD: update error --> '+ err) })
			}
		})
	})
}
// Mapping functions

// const mappingCIS = function(line) {
// 	// let mappedLine = {
// 	// 	cis:									convertValue(rowArray[0]),
// 	// 	labelMed:							convertValue(rowArray[1]),
// 	// 	pharmaForm:						convertValue(rowArray[2]),
// 	// 	medRoute:							convertValue(rowArray[3]),
// 	// 	adminStatus:					convertValue(rowArray[4]),
// 	// 	procedureType:				convertValue(rowArray[5]),
// 	// 	commercialState:			convertValue(rowArray[6]),
// 	// 	aamDate:							convertDate(rowArray[7]),
// 	// 	bdmStatus:						convertValue(rowArray[8]),
// 	// 	numEUAuth:						convertValue(rowArray[9]),
// 	// 	holder:								convertValue(rowArray[10]),
// 	// 	reinforcedMonitoring:	convertValue(rowArray[11]),
// 	// }
// 	// eslint-disable-next-line no-undef
// 	return mappedLine
// }

// const mappingCIP = function(line) {
// 	// let mappedLine = {
// 	// 	cip7:									convertValue(rowArray[1]),
// 	// 	cip13:								convertValue(rowArray[6]),
// 	// 	cis:									convertValue(rowArray[0]),
// 	// 	label:								convertValue(rowArray[2]),
// 	// 	adminStatus:					convertValue(rowArray[3]),
// 	// 	commercialState:			convertValue(rowArray[4]),
// 	// 	commercialDate:				convertDate(rowArray[5]),
// 	// 	reimbursementRate:		convertNumber(rowArray[8]),
// 	// 	priceTTC:							convertAmount(rowArray[9]),
// 	// 	reimbursementAmount:	convertAmount(rowArray[10]),
// 	// 	priceHD:							convertAmount(rowArray[11]),
// 	// 	reimbursementText:		convertValue(rowArray[12])
// 	// }
// 	// eslint-disable-next-line no-undef
// 	return mappedLine
// }

// const mappingCOMPO = function(line) {
// 	// let line = {
// 	// 	cis:							convertValue(rowArray[0]),
// 	// 	label:						convertValue(rowArray[1]),
// 	// 	substanceID:			convertValue(rowArray[2]),
// 	// 	substanceDosage:	convertValue(rowArray[4]),
// 	// 	substanceLabel:		convertValue(rowArray[3]),
// 	// 	reference:				convertValue(rowArray[5]),
// 	// 	nature:						convertValue(rowArray[6]),
// 	// 	natureID:					convertValue(rowArray[7])
// 	// }
// 	return mappedLine
// }
// const mappingGENER = function(line) {
// 	// let mappedLine = {
// 	// 	id:			convertValue(rowArray[0]),
// 	// 	label:	convertValue(rowArray[1]),
// 	// 	cis:		convertValue(rowArray[2]),
// 	// 	type:		convertValue(rowArray[3]),
// 	// 	sort:		convertValue(rowArray[4]),
// 	// }
// 	return mappedLine
// }
// const mappingCPD = function(line) {
// 	// let mappedLine = {
// 	// 	cis:				convertValue(rowArray[0]),
// 	// 	condition:	convertValue(rowArray[1]),
// 	// }
// 	return mappedLine
// }

// Conversion functions
const convertValue = function(p_val) {
	let value = p_val.trim()
	return value
}
const convertNumber = function(p_val) {
	let number = p_val.replace('%','').trim()
	if ( number == '' ) return null

	return number
}
const convertDate = function(p_date) {
	p_date.trim()
	let date = p_date.substring(6,10) + '-' + p_date.substring(3,5) + '-' + p_date.substring(0,2)
	return date
}
const convertAmount = function(p_amount) {
	if ( p_amount == '' ) return null

	let decimal = p_amount.substring( p_amount.length - 2, p_amount.length )
	let units = p_amount.substring(0, p_amount.length - 3 )
	units = units.replace(',','')

	let price = units+'.'+decimal
	return price
}

const updateFiles = async () => {

	try {
		for(var i=0; i<files.length; i++ ) {
			let file = files[i]
			// eslint-disable-next-line no-unused-vars
			const response = await downloadFromURL(file.url, file.name, file.folder)
			// const response = downloadFromURL(file.url, file.name, file.folder)
			console.log(response)
			// eslint-disable-next-line no-unused-vars
			const processed = await uploadFileToDB(file.name)
			console.log(processed)
		}
	}
	catch (err) {
		console.log(err)
		console.log('Error BDPM update')
	}
}

const readLastUpdateDate = async () => {
	return new Promise((resolve, reject) => {
		Common.updates_logs.findByPk('BDPM')
			.then(line => {
				resolve(line.dataValues.timestamp)
			})
			.catch(err => {
				reject('Error: ' + err)
			})
	})
}

module.exports = {
	updateFiles,
	readLastUpdateDate
}