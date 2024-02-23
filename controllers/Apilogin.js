const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const login = async (req, res = express)=>{

    let email = req.body.email;
    let password = req.body.password;

    const login = await Usuario.findOne({where:{email:email, estado:'ACTIVO'}}).then(user=>{
        //si no existe usuarios
        if (!user) {
            return res.status(401).json({'usNot':'el usario no existe'});
        }

        //si es lo contrario se compara el password
        bcrypt.compare(password, user.password,(err, result)=>{
            if(!result){
                return res.status(401).json({'PassNot':'Password incorrecto'});    
            }

            const token = jwt.sign({sub:user.id_usuario}, "12345",{expiresIn:'1h'});

            return res.status(200).json({"success":"Autenticado","usuario":user, "token":token});
        });
    });


};

module.exports = {
    login
};
