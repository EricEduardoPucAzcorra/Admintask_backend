//instancia de router
const {Router} = require('express');

//importo controllers
const ApiTarea = require('../controllers/ApiTarea');
const ApiUsuario = require('../controllers/ApiUsuario');
const ApiPerfil = require('../controllers/ApiPerfil');
const ApiProyecto = require('../controllers/ApiProyecto');
const Apilogin = require('../controllers/Apilogin');
const ApiEvent  = require('../controllers/ApiEvento');
const ApiCategoria = require('../controllers/ApiCategoria');
//instancia de router
const router = Router();
//rutas http

//login
router.post('/login', Apilogin.login);
///--------------------------------Modulo admin----------------------------------
//usuarios
router.get('/usuarios', ApiUsuario.index);
router.post('/createUser', ApiUsuario.createUsuario);
router.put('/updateUser', ApiUsuario.updateUsuario);
router.put('/updateUser/estado/activo', ApiUsuario.activar);
router.put('/updateUser/estado/desactivado', ApiUsuario.desactivar);
router.get('/countUser', ApiUsuario.CountUsers);
router.post('/user_perfil', ApiUsuario.findUser);
//perfiles
router.get('/perfiles', ApiPerfil.index);

//tareas
router.get('/tareas', ApiTarea.index);

//proyectos
router.get('/proyectos',ApiProyecto.index);
router.post('/createProyect', ApiProyecto.createProyect);
router.put('/updateProyecto', ApiProyecto.updateProyect);
//categorias Projects
router.get('/categorias', ApiCategoria.index);

//eventos
router.get('/eventos', ApiEvent.index);

router.delete('/delete/event_user/:id_usuario/:id_evento', ApiEvent.DeleteEventAdmin);

router.post('/asignar/event', ApiEvent.asignarEvent);

router.get('/eventsDay/admin', ApiEvent.EventsDayAll);

//----------------------------------------moodulo dev--------------------------------------------

router.post('/tareasDev', ApiTarea.indexDev); 

router.post('/createTarea', ApiTarea.createTarea);

router.put('/updateTarea', ApiTarea.updateTarea);

router.delete('/deleteTarea/:id', ApiTarea.deleteTarea );

router.post('/countTareas', ApiTarea.CountTarea);

//-----------------------------------------------Modulo Events dev------------------------------------

router.post('/eventsDev', ApiEvent.EventsDev);
router.post('/createEvent', ApiEvent.CreateEvent);
router.put('/updateEvent', ApiEvent.UpdateEvent);
router.delete('/deleteEvent/:id/:idUser', ApiEvent.DeleteEvent);
router.post('/countEvents', ApiEvent.CountEvent);
router.post('/events/calendar', ApiEvent.EventsCalendar);
router.post('/eventsDay', ApiEvent.EventsDay);
router.put('/update/estado', ApiEvent.UpdateEstado);


///-------------------------------------------Module projects for dev---------------------------------------
router.get('/countProyects', ApiProyecto.CountProyecto);


router.get('/prueba', ApiEvent.prueba);

//exporto router
module.exports = router;