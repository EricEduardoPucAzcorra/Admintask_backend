//rrelaciones con los modelos.
const Usuario = require('../models/Usuario')
const Tarea = require('../models/Tarea')
const Perfil = require('../models/Perfil')
const Proyecto = require('../models/Proyecto');
const cat_proyecto = require('../models/Cat_proyecto');
const Evento = require('./evento');
const Events_users = require('./Events_user');

//un perfil tiene un usuario
Perfil.belongsTo(Usuario,{
    foreignKey:'id_usuario'
});
//los usuaris corresponder a un perfil
Usuario.hasOne(Perfil,{
    foreignKey:'id_usuario'
});

//relacion una tarea tiene un usuario
Tarea.belongsTo(Usuario,{
    foreignKey:'id_usuario'
});
//un usuario tiene muchas tareas
Usuario.hasMany(Tarea,{
    foreignKey:'id_usuario'
});

///////////////////////////////////////////////////////// Tareas-Proyectos-Categorias
//una tarea pertenece a un proyecto
Tarea.belongsTo(Proyecto, {
    foreignKey:'id_proyecto'
});
//un proyecto tiene muchas tareas
Proyecto.hasMany(Tarea,{
    foreignKey:'id_proyecto'
});
//un proyecto tiene una categoria
Proyecto.belongsTo(cat_proyecto,{
    foreignKey:'id_categoria_p'
});

//un categoria es para varios productos
cat_proyecto.hasMany(Proyecto,{
    foreignKey:'id_categoria_p'
});
//mucho a muchos
Evento.belongsToMany(Usuario, { through: Events_users});
//Events_users.belongsToMany(Usuario, {through:Events_users});
Usuario.belongsToMany(Evento, { through: Events_users});



module.exports = {
    Usuario,
    Tarea,
    Perfil,
    Proyecto,
    cat_proyecto,
    Evento
};