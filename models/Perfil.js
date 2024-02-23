//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo
const Perfil = db.define('perfiles',{
    id_perfil:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},
    
    id_usuario:{type: Sequelize.INTEGER, allowNull:false},

    nombre:{type: Sequelize.STRING, allowNull:false},
    
    apellido_p: {type: Sequelize.STRING, allowNull:false},
    
    apellido_m: {type: Sequelize.STRING, allowNull:false},
    
    telefono: {type: Sequelize.STRING, allowNull:false},
    
    direccion: {type: Sequelize.STRING, allowNull:true},
    
    email: {type: Sequelize.STRING, allowNull:true, unique:true},
    
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
});


module.exports = Perfil

