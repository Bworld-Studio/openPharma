// Updates the external APIs from downloaded files
const bdpm = require('./bdpm/bdpm')

// eslint-disable-next-line no-unused-vars
const readFile = async (file) => {
	return new Promise((resolve,reject) => {
		// BDPM files
		if (file === 'BDPM') {
			bdpm.updateFiles()
				.then(() => {
					resolve(200)
				})
				.catch(error => {
					reject(error)
				})
		}
	})
	// BDM_IT
	// if ( file === 'ZIP' ) {
		
	// }
}

const readLastUpdatedFileDate = (file) => {
	return new Promise((resolve, reject) => {

		if (file === 'BDPM') {
			bdpm.readLastUpdateDate()
				.then(res => { resolve(res) })
				.catch(err => { reject(err) })
		}
	})
}

module.exports = {
	readFile,
	readLastUpdatedFileDate
}