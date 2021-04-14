const fs = require('fs')
const path = require('path')

module.exports = function(app) {
	
	const routesPath = path.join(__dirname, './api/') // eslint-disable-line no-undef

	fs.readdirSync(routesPath).forEach(function(file) {
		let path = './api/'+file+'/'+file
		// let path = './'+file+'/'+file.substr(0, file.lastIndexOf('.')) || file
		let route = require(path)
		app.use('/api', route)
	})

}