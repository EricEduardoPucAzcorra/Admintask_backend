//requiere express
const response = require('express');
const { Evento, Usuario, Perfil} = require('../models');
const Event_user = require('../models/Events_user');

//relacion table_user_events

const index = async (req, res= response)=>{
    const eventos = Evento.findAll({
        include:[
            {model:Usuario, include:[{model:Perfil}]}
        ]
    }).then(events=>{
        return res.status(200).json({events});
    }).catch(err=>{
        console.log(err);
    });
};

//list eventos dev
const EventsDev = async (req, res = response)=>{

    let usuario_id = req.body.id_usuario;
    let estado = req.body.estado;

    const eventos = await Usuario.findAll({
        where:{id_usuario:usuario_id},
        attributes:['id_usuario'],
        include:[
            {
                model:Evento,
                where:{estado:estado}
            }
        ]
    }).then(events=>{

        return res.status(200).json({events});

    });
   
};

const EventsCalendar = async (req, res = response)=>{

    let usuario_id = req.body.id_usuario;
   
    const eventos = await Usuario.findAll({
        where:{id_usuario:usuario_id},
        attributes:['id_usuario'],
        include:[
            {
                model:Evento
            }
        ]
    }).then(events=>{

        return res.status(200).json({events});

    });
   
};

const CountEvent = async (req, res= response)=>{
    
    const eventos = await Event_user.count(
        {where:{usuarioIdUsuario:req.body.id_usuario}
    });

    return res.status(200).json({eventos});

};

const EventsDay = async (req, res = response)=>{
    let usuario_id = req.body.id_usuario;

    let date = new Date();
    //let fecha = date.toLocaleString();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let anio = date.getFullYear();
 
    let fechaHoy = anio + '-' + mes + '-' + dia;

    const eventsDay = await Usuario.findAll( 
        {where:{id_usuario:usuario_id},
        attributes:['id_usuario'],
        include:[
            {model:Evento, where:{fecha:fechaHoy}}
        ]

    }).then(events=>{

        return res.status(200).json({events});


    });
};

const UpdateEstado = async(req, res = response)=>{

    let datos = {
        id_evento : req.body.id_evento,
        estado: req.body.estado
    };

    const event = Evento.findOne({where:{id_evento:datos.id_evento}}).then(evento=>{
        
        evento.update(datos);
        
        return res.status(200).json({
            'Exito':'Asistencia confirmada...!'
        });

    });
};

const DeleteEventAdmin= async (req, res = response)=>{
    let evento_id = req.params.id_evento;
    let id_usuario = req.params.id_usuario;

    const event_user = await Event_user.findOne({where:{usuarioIdUsuario:id_usuario, eventoIdEvento:evento_id}});

    if(event_user){

        await event_user.destroy();

        return res.status(200).json({
            'Exito':'El participante fue eliminado'
        });

    }

};
//end list eventos dev


//global
const CreateEvent = async (req, res = response)=>{
    
    let newEvent={
        nombre_event : req.body.nombre_event,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        hora: req.body.hora,
        medio: req.body.medio,
        lugar: req.body.lugar,
        id_usuario: req.body.id_usuario
    };

    const eventoNuevo = await Evento.create(newEvent);

    const event_user = await Event_user.create({usuarioIdUsuario:newEvent.id_usuario, eventoIdEvento: eventoNuevo.id_evento});

    console.log(eventoNuevo);

    return res.status(200).json({
        'Exito':'El evento fue creado'
    });

};

const UpdateEvent = async (req, res = response)=>{
    
    let EventUp = {
        id_evento: req.body.id_evento,
        nombre_event : req.body.nombre_event,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        hora: req.body.hora,
        medio: req.body.medio,
        lugar: req.body.lugar,
        id_usuario: req.body.id_usuario
    };

    const event = Evento.findOne({where:{id_evento:EventUp.id_evento}}).then(evento=>{
        
        evento.update(EventUp);
              
        return res.status(200).json({
            'Exito':'El evento fue actualizado'
        });
    });
};

const DeleteEvent = async (req, res = response)=>{
    let evento_id = req.params.id;
    let id_usuario = req.params.idUser;

    const event_user = await Event_user.findOne({where:{usuarioIdUsuario:id_usuario, eventoIdEvento:evento_id}});

    const evento = await Evento.findOne({where:{id_evento:evento_id}});

    if(event_user){

        await event_user.destroy();

        if(evento){
            await evento.destroy();
        }

        return res.status(200).json({
            'Exito':'El evento fue eliminado'
        });

    }else{

        return res.status(200).json({
            'Exito':'No existe la tarea'
        });
        
    }

};

//global
const asignarEvent = async (req, res = response)=>{
    let id_usuario = req.body.id_usuario;
    let id_evento = req.body.id_evento;

    const asignar = await Event_user.create({usuarioIdUsuario:id_usuario, eventoIdEvento:id_evento});

    return res.status(200).json({
        'Exito':'El evento fue asignado'
    });
};
const EventsDayAll = async (req, res = response)=>{
    
    let date = new Date();
    //let fecha = date.toLocaleString();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let anio = date.getFullYear();
 
    let fechaHoy = anio + '-' + mes + '-' + dia;

    const eventsDay = await Evento.findAll({where:{fecha:fechaHoy}}).then(events=>{

        return res.status(200).json({events});


    });
};

const prueba = async (req, res= response)=>{
    let array = [{data:[20,40,50]}];

    return res.status(200).json(array);

};

//metodo create

module.exports = {
    index,
    EventsDev,
    CreateEvent, 
    UpdateEvent,
    DeleteEvent,
    CountEvent,
    EventsDay,
    EventsCalendar,
    UpdateEstado,
    DeleteEventAdmin,
    asignarEvent,
    EventsDayAll,
    prueba
};