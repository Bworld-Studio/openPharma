const fs = require('fs')
const path = require('path')

module.exports = function(app) {

	const routesPath = path.join(__dirname, './routes') // eslint-disable-line no-undef
	fs.readdirSync(routesPath).forEach(function(file) {
		let path = './routes/'+file.substr(0, file.lastIndexOf('.')) || file
		let route = require(path)
		app.use('/api', route)
	})

}