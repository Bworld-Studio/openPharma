var fs = require('fs')
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var corsOptions = { origin: "http://localhost:3000" };

var app = express();	// Application creation

app.use(cors(corsOptions));

app.use(bodyParser.json());	// Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));	// Parse requests of content-type - application/x-www-form-urlencoded

var clients = require('./routes/clients');
app.use("/api", clients);

// Set port, listen for requests
// https.createServer({
// 	key: fs.readFileSync('key.prem'),
// 	cert: fs.readFileSync('cert.pem')
// }, app).listen(443)

// const port = 3000;
// app.listen(port, function() {
// 	console.log('Server started on port ' + port);
// });