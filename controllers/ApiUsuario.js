//requiere express
const response = require('express');
const bcrypt = require('bcryptjs');
const {Usuario, Perfil, Tarea} = require('../models');

//requiere los modelos
const index = async (req, res = response)=>{
 
    const usuarios = await Usuario.findAll({
        include:[
            {
                model:Perfil
            }
        ]
    });

    return res.status(200).json({
        usuarios
    });
};

const createUsuario = async(req, res=response)=>{

    let username = req.body.username;
    let email = req.body.email;
    let pass = await bcrypt.hash(req.body.password,8);
    let rol = req.body.rol;
    let nombre = req.body.nombre;
    let apellido_p  = req.body.apellido_p;
    let apellido_m =  req.body.apellido_m;
    let telefono = req.body.telefono;
    let direccion =  req.body.direccion;
    
    const user = await Usuario.create({
        username:username,
        email:email,
        password:pass,
        rol:rol,
        estado:req.body.estado
    });

    const perfilnew = await Perfil.create({
        id_usuario : user.id_usuario,
        nombre: nombre,
        apellido_p: apellido_p,
        apellido_m : apellido_m,
        telefono: telefono,
        direccion: direccion,
        email: email
    });



    return res.status(200).json({
        'Exito':'El usuario ha sido creado'
    });

};

const updateUsuario = async (req, res = response)=>{

    let arrayUser = {
        id_usuario:req.body.id_usuario,
        username:req.body.username,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password,8),
        rol:req.body.rol
    };

    let arrayPerfil = {
        id_perfil : req.body.id_perfil,
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m : req.body.apellido_m,
        telefono:  req.body.telefono,
        direccion: req.body.direccion,
        email: req.body.email
    };

    const user = await Usuario.findOne({where:{id_usuario: arrayUser.id_usuario}}).then(usuario=>{
        usuario.update(arrayUser);
    });

    const perfil = await Perfil.findOne({where:{id_perfil: arrayPerfil.id_perfil}}).then(perfilUs=>{

        perfilUs.update(arrayPerfil);
        //console.log(perfilUs)

    });

    // console.log(arrayPerfil)

    return res.status(200).json({
        'Exito':'El usuario ha sido actualizado'
    });
 

};

const indexDetails = async (req, res = response)=>{
 
    const usuarios = await Usuario.findAll({
        include:[
            {
                model:Tarea
            }
        ]
    });

    return res.status(200).json({
        usuarios
    });
};
const desactivar = async (req, res = response)=>{

    let array = {
        usuarioId:req.body.usuarioId,
        estado:'INACTIVO'
    };
    const usuario = await Usuario.findOne({where:{id_usuario:array.usuarioId}}).then(user=>{

        user.update(array);

        
        return res.status(200).json({
            'Exito':'El usuario ha sido removido'
        });

    });
};
const activar = async (req, res = response)=>{

    let array = {
        usuarioId:req.body.id_usuario,
        estado:'ACTIVO'
    };

    const usuario = await Usuario.findOne({where:{id_usuario:array.usuarioId}}).then(user=>{
        user.update(array);

        
        return res.status(200).json({
            'Exito':'El usuario ha sido restablecido'
        });
    });
};


const CountUsers = async (req, res= response)=>{
    
    const usuarios = await Usuario.count();

    return res.status(200).json(usuarios);

};

const findUser = async (req, res =response)=>{
    let id_usuario = req.body.id_usuario;
    
    const user = Usuario.findOne(
        {
            where:{id_usuario:id_usuario},

            include:[
                {model:Perfil}
            ]

        }).then(usuario=>{

        return res.status(200).json({usuario});

    });

};

module.exports = {
    index,
    createUsuario,
    updateUsuario,
    desactivar,
    activar,
    CountUsers,
    findUser
};