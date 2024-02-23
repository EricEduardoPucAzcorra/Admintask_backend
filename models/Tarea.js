//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo
const Tarea = db.define('tareas',{
    id_tarea:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},
    
    nombre:{type: Sequelize.STRING, allowNull:false},
    
    descripcion: {type: Sequelize.STRING, allowNull:false, unique:true},
    
    start:{type: Sequelize.DataTypes.STRING},

    end:{type: Sequelize.DataTypes.STRING},

    estado:{type: Sequelize.STRING},

    id_usuario:{type: Sequelize.INTEGER, allowNull:false},

    id_proyecto:{type: Sequelize.INTEGER, allowNull:false},

    estado:{type: Sequelize.STRING, allowNull:false},

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


module.exports = Tarea

