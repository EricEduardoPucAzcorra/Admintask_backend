//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo
const Evento = db.define('eventos',{
    id_evento:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},

    nombre_event:{type: Sequelize.STRING, allowNull:false},
    
    descripcion: {type: Sequelize.STRING, allowNull:false},
    
    fecha: {type: Sequelize.DataTypes.STRING, allowNull:false},
    
    hora: {type: Sequelize.DataTypes.STRING, allowNull:false},
    
    medio: {type: Sequelize.STRING, allowNull:true},
    
    lugar: {type: Sequelize.STRING, allowNull:true},

    estado:{type: Sequelize.STRING},
    
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


module.exports = Evento

