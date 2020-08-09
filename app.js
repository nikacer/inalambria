'use Strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const corsService = require('./middleware/cors')
const api = require('./routes');


const app = express();

app.use(cors())
app.use(corsService)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;