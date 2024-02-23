//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo
const Cat_proyecto = db.define('cat_proyectos',{
    id_categoriaP:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},

    nombre:{type: Sequelize.STRING, allowNull:false},
    
    descripcion: {type: Sequelize.STRING, allowNull:false},
        
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


module.exports = Cat_proyecto

