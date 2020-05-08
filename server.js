const express = require('express');
const bodyParser = require('body-parser');

const vue = require('vue');

const app = express();

// Middleware
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server started on port ${port}'));