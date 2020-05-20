const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');
const vue = require('vue');

var mariaParams = { host: 'localhost', user:'root', password: 'metal', connectionLimit: 0 }
const pool = mariadb.createPool( mariaParams );

const app = express();			// Application creation

app.use(bodyParser.json()); // Middleware

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server started on port ${port}'));