//uso de express
const express = require('express');

//servicios cors
const cors = require('cors');

//importando rutas

const routes = require('../routes/routes');

class Server{
    constructor(){
        //instcnai de express
        this.app = express();

        //consume puerto 
        this.port = process.env.PORT;

        //cargar middlewares
        this.middlewares();

        //consumiento apis
        this.apis();

    }

    apis(){
        this.app.use('/api', routes);
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Corriendo en el puerto:' + this.port)
        });
    }

}

module.exports = Server;