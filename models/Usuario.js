//sequelize
const Sequelize = require('sequelize')
//db
const db = require('../connect/connect');

//intsncia dle modelo

const Usuario = db.define('usuarios',{
    id_usuario:{type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true,allowNull: false,},
    username:{type: Sequelize.STRING, allowNull:false},
    email: {type: Sequelize.STRING, allowNull:false, unique:true},
    password:{type: Sequelize.STRING, allowNull:false},
    rol:{type: Sequelize.STRING, allowNull:false},
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




module.exports = Usuario;
