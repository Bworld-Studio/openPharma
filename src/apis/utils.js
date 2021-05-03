const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

const downloadFromURL = async (url, filename, folder) => {
	const path = Path.join(__dirname, folder, filename) // eslint-disable-line no-alert, no-undef
	const writer = Fs.createWriteStream(path)

	const response = await Axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve)
		writer.on('error', reject)
	})
}

// const getFileFromURL = (url, filename, folder) => {


// 	axios.get(url).then(
// 		result => {
// 			console.log(result.data)
// 			let file = fs.createWriteStream(path.join(__dirname, folder, filename), { flags: 'w' }) // eslint-disable-line no-alert, no-undef
// 			result.data.pipe(file)
// 			// console.log(result.data)
// 			// this.clients = result.data
// 		},
// 		error => {
// 			console.error(error)
// 		}
// 	)
// }

// const downloadFromURL = (url, filename, folder) => {
// 	return new Promise((resolve, reject) => {

// 		console.log(filename+': download file')
// 		var dest = path.join(__dirname, folder, filename)	// eslint-disable-line no-alert, no-undef
// 		const file = fs.createWriteStream(path.join(__dirname, folder, filename), { flags: 'w' }) // eslint-disable-line no-alert, no-undef
	
// 		const request = http.get(url, response => {
// 			if (response.statusCode === 200) {
// 				console.log('Code '+response.statusCode+' -- '+ filename)
// 				response.pipe(file)
// 			} else {
// 				file.close()
// 				fs.unlink(dest, () => {}) // Delete temp file
// 				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`)
// 			}
// 		})
	
// 		// HTTP Request Errors
// 		request.on('error', err => {
			
// 			file.close()
// 			fs.unlink(dest, () => {}) // Delete temp file
	
// 			var message = 'Request Error: ' + err
// 			reject(message)
// 		})
	
// 		// File downloading pending
// 		file.on('pending', () => {
// 			console.log(filename+': file downloading')
// 		})
	
// 		// File downloading finished
// 		file.on('finish', () => {
// 			console.log(filename+': file downloaded')
// 			resolve('File downloaded successfully')
// 		})
// 		// Error while downloading file
// 		file.on('error', err => {
// 			console.log('File Error: ' + err)
// 			file.close()
// 			if (err.code === 'EEXIST') {
// 				let message = 'File already exists'
// 				reject(message)
// 			} else {
// 				reject(err.message)
// 			}
// 		})
// 	})
// }

module.exports = {
	downloadFromURL
}