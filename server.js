const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mariadb = require('mariadb');
// const vue = require('vue');

var mariaParams = { host: 'localhost', user:'root', password: 'metal', connectionLimit: 0 };
const pool = mariadb.createPool( mariaParams );

// Application creation
const app = express();

 // Middleware
var corsOptions = { origin: "http://localhost:3000" };
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const dbA = require("./app/models");
dbA.sequelize.sync();

// Simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to openPharma 0.1." });
});

// Set port, listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port ${port}.`);
});