var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var corsOptions = { origin: "http://localhost:3000" };

var clients = require('./routes/clients');

// Application creation
var app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());	// Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));	// Parse requests of content-type - application/x-www-form-urlencoded

app.use("/api", clients);

// Set port, listen for requests
const port = 3000;
app.listen(port, function() {
	console.log('Server started on port ' + port);
});