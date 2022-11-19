const controllerUser = {};

const express = require("express");
const { response } = express;

// traemos la conexion
const connectedDB = require("../DBConfig/databaseConfig.js")

// trameos el metodo validationResult de express-validator
const { validationResult } = require("express-validator")


// traemos el paquete de encriptacion
const bcrypt = require("bcryptjs");


// importamos la funcion para crear el token
const { crearJWT } = require("../helpers/jwt.helper")


//mostrar usuarios
controllerUser.usuarios = ((req, res) => {
    let query = "SELECT * FROM usuarios"

    try {

        connectedDB.query(query, (err, rows) => {
            if (err) throw err;

            res.send(rows)

        })

    } catch (err) {

        res.send(res.statusCode + " ha habido un error")
    }

});

//Insertar usuario
controllerUser.insertUser = ((req, res) => {

    const validator = validationResult(req);
    if (validator.errors.length > 0) {
        res.status(400).json(validator.errors)
        return;
    }

    const { nombreUsuario, password } = req.body;
    try {

        //Controlamos que no haya usuario con el mimo nombre. rows nos devuelve un array con los elementos si es o es que no hay
        //ningun usuario registrado y entonces podemos hacer la query de insert.
        let query = "SELECT nombreUsuario FROM usuarios WHERE nombreUsuario = ?"
        connectedDB.query(query, [nombreUsuario], (err, rows, field) => {
            if (err) throw err;

            if (rows.length == 0) {

                query = "INSERT INTO usuarios (nombreUsuario, password) VALUES (?,?)";

                //Encriptamos la contraseña antes de enviarla
                const salt = bcrypt.genSaltSync();
                let securePassword = bcrypt.hashSync(password, salt);

                connectedDB.query(query, [nombreUsuario, securePassword], (err, rows) => {

                    if (err) throw err;

                    res.send("datos insertados correctamente")
                });

            } else {
                res.send(" Nombre de usuario ya registrado")
            }
        })

    } catch (err) {

        res.send(err)

    }
})

// Borrar usuario
controllerUser.deleteUser = ((req, res) => {

    const { id } = req.body;

    let query = "DELETE FROM usuarios WHERE idUsuario = ?";

    try {

        connectedDB.query(query, [id], (err, rows, fields) => {

            if (err) throw err;

            res.send(`El usuario  se ha eliminado de la base de datos`)

        });

    } catch (err) {

        res.send(err)

    }
})

// Modificar usuario
controllerUser.updateUser = ((req, res) => {

    const { nombreUsuario, password, idUsuario } = req.body;

    let query = "UPDATE usuarios SET nombreUsuario = ?, password = ? WHERE idUsuario = ?";

    try {

        connectedDB.query(query, [nombreUsuario, password, idUsuario], (err, rows) => {

            if (err) throw err;

            res.send(`Usuario con id ${idUsuario} se ha modificado`)


        });

    } catch (err) {

        res.send(err)

    }
})


// Login usuario
controllerUser.login = ((req, res) => {

    const validator = validationResult(req);
    if (validator.errors.length > 0) {
        res.status(400).json(validator.errors)
        return;
    }
    const { nombreUsuario, password } = req.body;
    try {
        let query = "SELECT idUsuario, password FROM usuarios WHERE nombreUsuario=?"
        connectedDB.query(query, [nombreUsuario], (err, rows, fields) => {
            if (err)
                throw err;
            if (rows != 0) {
                const validPassword = bcrypt.compareSync(password, rows[0]['password']);
                //Si la contrañea mandada es igual a la de la bd que tenemos encriptada el login es valido
                if (validPassword) {
                    //creamos el token pasandole el idUsuario
                    crearJWT(rows[0]['idUsuario']).then((token) => {
                        res.json({
                            msg: `Bienvenido ${nombreUsuario}`,
                            token
                        });
                    }).catch((err) => {
                        res.json({
                            msg: err
                        })
                    })
                }
            } else {
                res.send("Usuario o contraseña incorrectos")
            }
        });
    } catch (error) {
        res.send(res.statusCode + "Usuario o contraseña incorrectos")
    }
})

// Control de acceso mediante perfiles
controllerUser.profile = ((req, res) => {

    const { id } = req;
    try {
        //nos traemos el nombre del usuario
        connectedDB.query(`SELECT nombreUsuario from usuarios WHERE idUsuario=${id}`, (err, rows) => {

            if (err) throw err;

            res.status(200).json({
                id: id,
                User: rows[0].nombreUsuario,
                msg: 'Pefil usuario ok'
            })
        })
    } catch (error) {
        console.log(error);
    }

})



module.exports = controllerUser;


///=============================================E N C R I P T A C I O N============================================

// Instalamos el paquete npm i bryptjs y lo importamos.

// y tenemos que encriptar el password ante de insertarlo

//tenemos que generar un salt llamamos al paquete bycrity y llamamos al paquete getSaltSync() y

// no creamos una varialble que le vamos a iguar al paquete bycrit con el metodo hasSync() que recibe dos parametros, el salt
// y la contraseña que queremos encriptar


/*=============================================L  O  G  I  N============================================


// Nos creamos una funcion de login
   
   .- Validamos que el nombre de usuario y contraseña sean correctos

   .- Creamos las variable que recojemos del body
 
   .- Nos traemos idUsuairo y la contraseña del nombre de usuario que le pasamos, si no recibimos nada es que hubo un error

   .- Comprobamos que la contraseña que recibimos es igual a la contraseña encirptada que tenemos en la bd
      Para ellos usamos el metodo Sincrono "compareSync()" para que el programa se espere a que se ejecute la linea
       y le pasamos primero la contraseña sin escritar que envia en cliente y llegar por el req,  y luego la 
       contraseña encriptada que esta daentro de los rows en la primera posicion con el campo "password" 
       Y si es true pues el login es exitios


    .- Si todo va bien le enviamos el  token que nos devuleve como promesa la funcion crearToken definida en los helpesrs
       y si va mal en le catch  le enviamos el mensaje de erro definido en la propia función

     
     ,-  En las rutas definimos la ruta para el login  





*/