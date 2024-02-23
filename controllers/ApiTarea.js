//requiere express
const response = require('express');
const { Tarea, Usuario, Proyecto, Perfil} = require('../models');

 
//methods user dev
const indexDev = async(req, res = response)=>{

    let user_id = req.body.id_user;
    let estado = req.body.estado;

    const tareasDev = await Tarea.findAll(
        {
            where:{id_usuario:user_id, estado:estado}, 
            include:[
                {
                    model:Proyecto
                }
            ]
        }).then(tareas=>{
        
            return res.status(200).json(tareas);
    });

    //return res.status(200).json({'id_user':user_id})

};

const CountTarea = async (req, res= resonse)=>{
    
    const tareas = await Tarea.count({where:{id_usuario:req.body.id_usuario, estado:'PENDIENTE'}});

    return res.status(200).json(tareas);

};

//end methods user dev


//methods global for dev and admin
const index = async (req, res = response)=>{
    
    const tareas = await Tarea.findAll({
       include:[
        {
        model:Usuario, include:[
            {model:Perfil}
        ]
        }
        ,
        {
        model:Proyecto
        }
        ]
    });

    return res.status(200).json({
        tareas
    });
};

const createTarea = async (req, res = response)=>{
    let tareaNueva = {
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        start:req.body.start,
        end:req.body.end,
        estado:req.body.estado,
        id_usuario:req.body.id_usuario,
        id_proyecto:req.body.id_proyecto
    };
    const tarea = await Tarea.create(tareaNueva);

    return res.status(200).json({
        'Exito':'La tarea fue creada'
    });
    
};

const updateTarea = async (req, res = response)=>{
    let tareaUp = {
        id_tarea:req.body.id_tarea,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        start:req.body.start,
        end:req.body.end,
        estado:req.body.estado,
        id_usuario:req.body.id_usuario,
        id_proyecto:req.body.id_proyecto
    };

    const t = Tarea.findOne({where:{id_tarea:tareaUp.id_tarea}}).then(tarea=>{
        
        tarea.update(tareaUp);
              
        return res.status(200).json({
            'Exito':'La tarea fue actualizada'
        });
    });


};

const deleteTarea = async (req, res = response)=>{
    const tareaId = req.params.id;

    const tarea = await Tarea.findOne({where:{id_tarea : tareaId}});

    if(tarea){
        await tarea.destroy();
        return res.status(200).json({
            'Exito':'La tarea fue eliminada'
        });
    }else{
        return res.status(200).json({
            'Exito':'No existe la tarea'
        });
    }

    //console.log(tareaId)

};


//end methods global 

module.exports = {
    index,
    indexDev,
    createTarea,
    updateTarea,
    deleteTarea,
    CountTarea
};