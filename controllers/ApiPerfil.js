const express = require('express');

const  {Perfil, Usuario} = require('../models');

const index = async (req, res = express)=>{
    const perfiles = await Perfil.findAll({
        include:{
            model:Usuario
        }
    });

    return res.status(200).json({
        perfiles
    });
};

module.exports={
    index
}