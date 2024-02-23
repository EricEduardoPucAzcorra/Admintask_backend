const {Sequelize } = require('sequelize');
//db
const db = require('../connect/connect');
const Evento = require('./evento');
const Usuario = require('./Usuario');

const events_users = db.define('events_users',{

    id:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},

    usuarioIdUsuario:{
        type: Sequelize.INTEGER,
        //  allowNull:false,
         references:{
            model:Usuario,
            key:'id_usuario'
         }
    },

    eventoIdEvento: {
        type: Sequelize.INTEGER, 
        // allowNull:false,
        references:{
            model:Evento,
            key:'id_evento'
        }
    },
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

module.exports = events_users;
