const urls = {
	cis: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',
	cip: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt',				// eslint-disable-line no-alert, no-unused-vars
	compo: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	gener: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',		// eslint-disable-line no-alert, no-unused-vars
	cpd: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt'					// eslint-disable-line no-alert, no-unused-vars
}

const http = require('http')
const fs = require('fs')
const path = require('path')
const BDPM = require('../models/BDPM')

async function downloadFile (url, filename) {
	return new Promise((resolve, reject) => {
		console.log(filename+': download file')
		var dest = path.join(__dirname, 'bdpm', filename)	// eslint-disable-line no-alert, no-undef
		const file = fs.createWriteStream(path.join(__dirname, 'bdpm', filename), { flags: 'w' }) // eslint-disable-line no-alert, no-undef

		const request = http.get(url, response => {
			if (response.statusCode === 200) {
				response.pipe(file)
			} else {
				file.close()
				fs.unlink(dest, () => {}) // Delete temp file
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`)
			}
		})

		request.on('error', err => {
			console.log('Request Error: ' + err)
			file.close()
			fs.unlink(dest, () => {}) // Delete temp file
			reject(err.message)
		})

		file.on('finish', () => {
			console.log(filename+': file downloaded')
			uploadToDatabaseG(dest, filename)
			resolve()
		})

		file.on('error', err => {
			console.log('File Error: ' + err)
			file.close()
			if (err.code === 'EEXIST') {
				reject('File already exists')
			} else {
				//TODO: Gérer les codes retour pour les integrations BDPM
				// fs.unlink(dest, () => {}) // Delete temp file
				// reject(err.message)
			}
		})
	})
}

async function uploadToDatabaseG (dest, filename) { // eslint-disable-line no-alert, no-unused-vars
	new Promise((resolve, reject) => {

		fs.readFile(path.join(__dirname, 'bdpm', filename), 'latin1', (err, data) => {	// eslint-disable-line no-alert, no-undef
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
				BDPM.bdpm_cis.bulkCreate(array).then(function() { console.log('CIS: update done') } )
					.catch(err => { console.log('CIS: update error -->'+ err) })
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
				BDPM.bdpm_cip.bulkCreate(array, { raw: true }).then(function() { console.log('CIP: update done') } )
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
				BDPM.bdpm_compo.bulkCreate(array, { raw: true }).then(function() { console.log('COMPO: update done') } )
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
				BDPM.bdpm_gener.bulkCreate(array, { raw: true }).then(function() { console.log('GENER: update done') } )
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
				BDPM.bdpm_cpd.bulkCreate(array, { raw: true }).then(function() { console.log('CPD: update done') } )
					.catch(err => { console.log('CPD: update error --> '+ err) }) 
			}
		})
	})
}

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

exports.updateFile = function(file) {
	const url = urls[file]
	downloadFile(url, file)
}