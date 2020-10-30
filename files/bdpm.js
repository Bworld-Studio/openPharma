// const cis = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt'					// eslint-disable-line no-alert, no-unused-vars
// const cip = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt'			// eslint-disable-line no-alert, no-unused-vars
// const compo = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt'	// eslint-disable-line no-alert, no-unused-vars
// const gener = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt'	// eslint-disable-line no-alert, no-unused-vars
// const cpd = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt'			// eslint-disable-line no-alert, no-unused-vars

const urls = {
	cis: 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt',						// eslint-disable-line no-alert, no-unused-vars
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
		console.log('Download file: ' + filename)
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
			console.log('File downloaded')
			uploadToDatabaseG(dest, filename)
			resolve()
		})

		file.on('error', err => {
			console.log('File Error: ' + err)
			file.close()
			if (err.code === 'EEXIST') {
				reject('File already exists')
			} else {
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
				console.log('File read: ' + err)
				return reject(err)
			}
			if (!err) console.log('Upload file: ' + filename + ' to database')
			let array = []
			// BDPM cis file -- OK
			if ( filename === 'cis' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis: convertValue(rowArray, 0),
							labelMed: convertValue(rowArray, 1),
							pharmaForm: convertValue(rowArray, 2),
							medRoute: convertValue(rowArray, 3),// rowArray[3].trim(),
							adminStatus: convertValue(rowArray, 4), // rowArray[4].trim(),
							procedureType: convertValue(rowArray, 5), // rowArray[5].trim(),
							commercialState: convertValue(rowArray, 6), // rowArray[6].trim(),
							aamDate: convertDate(rowArray[7]), // rowArray[7].substring(6,10) + '-' + rowArray[7].substring(3,5) + '-' + rowArray[7].substring(0,2),
							bdmStatus: convertValue(rowArray, 8),// rowArray[8].trim(),
							numEUAuth: convertValue(rowArray, 9), //rowArray[9].trim(),
							holder: convertValue(rowArray, 10), // rowArray[10].trim(),
							reinforcedMonitoring: rowArray[11].trim()
						}
						array.push(line)
					}
				})
				BDPM.cis.bulkCreate(array, { raw: true }).then(res => { console.log('CIS Update done: '+ res) } )
					.catch(err => { console.log('CIS Update error: '+ err) })
			}
			// CIP file -- OK
			if ( filename === 'cip' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cip7: rowArray[1].trim(),
							cip13: rowArray[6].trim(),
							cis: rowArray[0].trim(),
							label: rowArray[2].trim(),
							adminStatus: rowArray[3].trim(),
							commercialState: rowArray[4].trim(),
							commercialDate: convertDate(rowArray[5]), // rowArray[5].substring(6,10) + '-' + rowArray[5].substring(3,5) + '-' + rowArray[5].substring(0,2),
							reimbursementRate: ( rowArray[8] != '' ) ? rowArray[8].replace('%','').trim() : null,
							priceTTC: ( rowArray[9] != '' ) ? convertAmount(rowArray[9].trim()) : null,
							reimbursementAmount: ( rowArray[10] != '' ) ? convertAmount(rowArray[10].trim()) : null,
							priceHD: ( rowArray[11] != '' ) ? convertAmount(rowArray[11].trim()) : null,
							reimbursementText: rowArray[12].trim(),
						}
						array.push(line)
					}
				})
				BDPM.cip.bulkCreate(array, { raw: true })
					.catch(err => { console.log('CIP Update error: '+ err) })
			}
			// BDPM compo file -- ok
			if ( filename === 'compo' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis: rowArray[0].trim(),
							label: rowArray[1].trim(),
							substanceID: rowArray[2].trim(),
							substanceDosage: rowArray[4].trim(),
							substanceLabel: rowArray[3].trim(),
							reference: rowArray[5].trim(),
							nature: rowArray[6].trim(),
							natureID: rowArray[7].trim(),
						}
						array.push(line)
					}
				})
				BDPM.compo.bulkCreate(array, { raw: true })
					.catch(err => { console.log('COMPO Update error: '+ err) })
			}
			// BDPM gener file -- ok
			if ( filename === 'gener' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							id: rowArray[0].trim(),
							label: rowArray[1].trim(),
							cis: rowArray[2].trim(),
							type: rowArray[3].trim(),
							sort: rowArray[4].trim(),
						}
						array.push(line)
					}
				})
				BDPM.gener.bulkCreate(array, { raw: true })
					.catch(err => { console.log('GENER Update error: '+ err) })
			}
			// BDPM cpd file -- ok
			if ( filename === 'cpd' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis: rowArray[0].trim(),
							condition: rowArray[1].trim(),
						}
						array.push(line)
					}
				})
				BDPM.cpd.bulkCreate(array, { raw: true })
					.catch(err => { console.log('CPD Update error: '+ err) })
			}
		})
	})
}

var convertValue = function(struc, position) {
	var value = struc[position].trim()
	return value
}
var convertDate = function(dateText) {
	dateText.trim()
	var date = dateText.substring(6,10) + '-' + dateText.substring(3,5) + '-' + dateText.substring(0,2)
	return date
}

var convertAmount = function(price) {
	var decimal = price.substring( price.length - 2, price.length )
	var units = price.substring(0, price.length - 3 )
	units = units.replace(',','')

	var priceNew = units+'.'+decimal
	return priceNew
}

exports.downloadFiles = function(file) {
	// console.log(file)
	const url = urls[file]
	// console.log(file, url)
	downloadFile(url, file)
	// if (file == 'cis') downloadFile(url, file)
	// // uploadToDatabaseG(cis, 'cis' )
	// if (file == 'cip') downloadFile(cip, 'cip')
	// if (file == 'compo') downloadFile(compo, 'compo')
	// if (file == 'gener') downloadFile(gener, 'gener')
	// if (file == 'cpd') downloadFile(cpd, 'cpd')

	// downloadFile(compo, 'compo')
	// downloadFile(gener, 'gener')
	// downloadFile(cpd, 'cpd')
}