const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = '/appRoles'

        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json());
        
        this.routes();
    }


    routes(){
        this.app.use(this.apiPath, require('../routes/apps'));
    }

    listen() {
        this.app.listen(this.port, () => {console.log("Servidor corriendo en el puerto ", this.port)});
    }
}

module.exports = Server;