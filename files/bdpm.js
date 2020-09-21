const cis = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_bdpm.txt'					// eslint-disable-line no-alert, no-unused-vars
const cip = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CIP_bdpm.txt'			// eslint-disable-line no-alert, no-unused-vars
const compo = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_COMPO_bdpm.txt'	// eslint-disable-line no-alert, no-unused-vars
const gener = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt'	// eslint-disable-line no-alert, no-unused-vars
const cpd = 'http://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_CPD_bdpm.txt'			// eslint-disable-line no-alert, no-unused-vars

const http = require('http')
const fs = require('fs')
const path = require('path')
const Product = require('../models/Product')

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
			// CIS file
			if ( filename === 'cis' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						// let aamDate = rowArray[7].substring(6,10) + '-' + rowArray[7].substring(3,5) + '-' + rowArray[7].substring(0,2)
						let line = {
							cis: rowArray[0].trim(),
							labelMed: rowArray[1].trim(),
							pharmaForm: rowArray[2].trim(),
							medRoute: rowArray[3].trim(),
							adminStatus: rowArray[4].trim(),
							procedureType: rowArray[5].trim(),
							commercialState: rowArray[6].trim(),
							aamDate: rowArray[7].substring(6,10) + '-' + rowArray[7].substring(3,5) + '-' + rowArray[7].substring(0,2),
							bdmStatus: rowArray[8].trim(),
							numEUAuth: rowArray[9].trim(),
							holder: rowArray[10].trim(),
							reinforcedMonitoring: rowArray[11].trim()
						}
						array.push(line)
					}
				})
				Product.BDPM_Cis.bulkCreate(array, { raw: true })
					.catch(err => {  })
			}
			// CIP file
			if ( filename === 'cip' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						// let aamDate = rowArray[7].substring(6,10) + '-' + rowArray[7].substring(3,5) + '-' + rowArray[7].substring(0,2)
						let line = {
							cip7: rowArray[1].trim(),
							cip13: rowArray[6].trim(),
							cis: rowArray[0].trim(),
							label: rowArray[2].trim(),
							adminStatus: rowArray[3].trim(),
							commercialState: rowArray[4].trim(),
							commercialDate: rowArray[5].substring(6,10) + '-' + rowArray[5].substring(3,5) + '-' + rowArray[5].substring(0,2),
							reimbursementRate: rowArray[8].replace('%','').trim(),
							priceTTC: rowArray[9].replace(',','.').trim(),
							reimbursementAmount: rowArray[10].replace(',','.').trim(),
							priceHD: rowArray[11].replace(',','.').trim(),
							reimbursementText: rowArray[12].trim(),
						}
						array.push(line)
					}
				})
				Product.BDPM_Cip.bulkCreate(array, { raw: true })
					.catch(err => {  })
			}
			// COMPO file
			if ( filename === 'compo' ) {
				data.split('\n').map(row => {
					let rowArray = row.split('\t')
					if ( rowArray[0] !== '' ) {
						let line = {
							cis: rowArray[0].trim(),
							label: rowArray[1].trim(),
							substanceID: rowArray[2].trim(),
							substanceLabel: rowArray[3].trim(),
							substanceDosage: rowArray[4].trim(),
							reference: rowArray[5].trim(),
							nature: rowArray[6].trim(),
							natureID: rowArray[7].trim(),
						}
						array.push(line)
					}
				})
				Product.BDPM_Compo.bulkCreate(array, { raw: true })
					.catch(err => {  })
			}
			// GENER file
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
				Product.BDPM_Gener.bulkCreate(array, { raw: true })
				.catch(err => {  })
			}
			// CPD file
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
				Product.BDPM_Cpd.bulkCreate(array, { raw: true })
				.catch(err => {  })
			}
		})
	})
}

exports.downloadFiles = function() {
	// uploadToDatabaseG(cis, 'cis' )
	downloadFile(cis, 'cis')
	downloadFile(cip, 'cip')
	// downloadFile(compo, 'compo')
	// downloadFile(gener, 'gener')
	// downloadFile(cpd, 'cpd')
}