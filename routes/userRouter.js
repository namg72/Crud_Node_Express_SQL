const express = require("express")
const router = express.Router();

//requerimos el metodo check del paquete express-validator;
const { check } = require("express-validator");

// importamos el middleware para validar el jwt
const { validateJWt } = require("../middlewares/validatorJWT.middleware")


// imortamos los controladores
const { usuarios, insertUser, deleteUser, updateUser, login, profile } = require("../controllers/controllerUser.js")


// RUTAS 

// mostar todos los usuarios
router.get("/usuarios", usuarios);

// insertar usuario
router.post("/usuarios/insert", [
    check("nombreUsuario", "El nombre de usuario es obligatorio").not().isEmpty(), // No puede ser vacio
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña tiene que entre 6 y 12 caracteres").isLength({ min: 6, max: 12 }), //tamaño contraseña
    check("password", "La contraseña tiene que ser Alfanumerica").isAlphanumeric() //alfanumerica

], insertUser);

// borrar usuario
router.delete("/usuarios/delete", deleteUser);

// modificar usuario
router.put("/usuarios/update", updateUser);

// ruta login
router.post("/usuarios/login", [
    check("nombreUsuario", "Nombre de usuario o contraseña incorrecto").not().isEmpty(), // No puede ser vacio
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "Nombre de usuario o contraseña incorrecto").isLength({ min: 6, max: 12 }), //tamaño contraseña
    check("password", "Nombre de usuario o contraseña incorrecto").isAlphanumeric() //alfanumerica login)

], login);


// ruta para comprobar que en las petiicones get el jwt es correcto 
router.get('/', [
    validateJWt

], profile)

// exportamos ruta
module.exports = router


///================================================V A L I D A C I O N============================================

// vamos a validar los datos incluidos en la petición de insertar usuarios mediante middelwares
//instalamos el paquete expre-validator 
//utilizamos la funcion check del paquete express-validator
// En la ruta antes del controllador ponemos un array con los middelwares que requiramos para validar
//    dentro del check ponemos primero el nombre del campo que queremos validar, luego un mensaje de error por si no pasa, 
//    y luego la función de validacion

// El check directamente no para el ingreso de datos sino que recoge los errores  en un array y los inyecta en el request
// esos errores los tenemos que controlar en el controller mediante el meetodo validationResult de express-validator

// En el controlador tenemos que importar metodo validationResult de express-validator