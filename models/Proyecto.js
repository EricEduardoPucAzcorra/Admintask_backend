//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo

const Proyecto = db.define('proyectos',{
    id_proyecto:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},
    
    nombre:{type: Sequelize.STRING, allowNull:false},
    
    descripcion: {type: Sequelize.STRING, allowNull:false, unique:true},
    
    inicio:{type: Sequelize.DataTypes.STRING},

    final:{type: Sequelize.DataTypes.STRING},

    id_categoria_p:{type: Sequelize.INTEGER, allowNull:false},

    porcentaje : {type:Sequelize.INTEGER, allowNull:true},

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


module.exports = Proyecto;
