//requiere express
const response = require('express');
//requiere los modelos
const Usuario = require('../models/Usuario');

const index = (req, res = response)=>{
    Usuario.findAll().then(function(result){
        return res.json(result);
    });
};

module.exports = {
    index
};