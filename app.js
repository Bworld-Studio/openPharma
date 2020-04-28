var express = require('express');   // Require express
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/openPharma');

var app = express();    // Instanciate Express application

app.get('/', (req, res) => {	// Function executed at root of the page
	res.send('openPharma 0.1')
});

console.log('openPharma launched on port 3000');	// Test
app.listen(3000);