const functions = require('firebase-functions');
const express = require('express');
const routes = require('./routes')
const cors = require('cors');

const bodyParser = require('body-parser')

const app = express();
app.use(cors({ origin: true }));

//Habilitar BodyParse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Habilitar Routing
app.use('/',routes());

exports.app = functions.https.onRequest(app);