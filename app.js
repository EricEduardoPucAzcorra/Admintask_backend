//requiere dotenf
const dotenv = require('dotenv');

//configuracion variables 
dotenv.config({path:'./env/.env'});

//conexion con mysql
const connection = require('./connect/connect');

//uso de server
const server = require('./server/server');

//instancia de server
const servidor = new server();

//saber si esta corrindo el puerto

servidor.listen();