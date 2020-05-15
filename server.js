const express = require('express');
const bodyParser = require('body-parser');

const mariadb = require('mariadb');

var mariaParams = { host: 'localhost', user:'root', password: 'metal', connectionLimit: 0 }

const pool = mariadb.createPool( mariaParams );

const vue = require('vue');


const app = express();

// Middleware
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server started on port ${port}'));