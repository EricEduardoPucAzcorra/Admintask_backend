const express = require('express')

const {Proyecto, Tarea, cat_proyecto} = require('../models');

//global methods dev and admin
const index = async (req, res = express)=>{
    const proyectos = await Proyecto.findAll({
        include:[   
            {
                 model:Tarea
            },
            {
                model:cat_proyecto
            }
           
        ]
    });

    return res.status(200).json({
        proyectos
    });
};

const createProyect = async(req, res = express)=>{
    let nuevoProject = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        inicio: req.body.inicio,
        final: req.body.final,
        id_categoria_p: req.body.id_categoria_p,
        porcentaje:req.body.porcentaje
    };

    const createProject = await Proyecto.create(nuevoProject);

    return res.status(200).json({
        "Exito":"Proyecto creado exitosamente"
    });
};

const updateProyect = async(req, res = express)=>{
    let updateProject = {
        id_proyecto: req.body.id_proyecto,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        inicio: req.body.inicio,
        final: req.body.final,
        id_categoria_p: req.body.id_categoria_p,
        porcentaje:req.body.porcentaje
    };

    const proyecto  = await Proyecto.findOne({where:{id_proyecto: updateProject.id_proyecto}}).then(project=>{
        project.update(updateProject);

        return res.status(200).json({
            "Exito":"Proyecto actualizado con exito"
        });
    });

};

//end global methods dev and admmin

//methods dev

const CountProyecto = async (req, res= response)=>{
    
    const proyectos = await Proyecto.count();

    return res.status(200).json(proyectos);

};

//end methods dev

module.exports = {
    index,
    CountProyecto,
    createProyect,
    updateProyect
};