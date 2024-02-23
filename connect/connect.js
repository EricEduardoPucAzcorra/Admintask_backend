//usar sequelize
const {Sequelize} = require('sequelize');

const db = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.HOST,
        dialect:'mysql'
    }
);

//se valida fue tiene accceso a la base de datos
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
    });
    
    //se exporta la bd para hacer uso de el dede cualquier js
module.exports=db;
