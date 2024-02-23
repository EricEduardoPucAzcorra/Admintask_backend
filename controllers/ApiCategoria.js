//requiere express
const response = require('express');
const Cat_proyecto = require('../models/Cat_proyecto');

const index = async (req, res = response)=>{
    const categorias = Cat_proyecto.findAll().then(categorys=>{
        return res.status(200).json({categorys});
    });
};

module.exports = {
    index
};