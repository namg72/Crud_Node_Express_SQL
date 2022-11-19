// Immportamos el paquete jwt

const jwt = require("jsonwebtoken");

const validateJWt = (req, res, next) => {

    //recogemos el token que nos viene en el hedear de la petición
    const token = req.header('Authorization')

    const responseError = {
        msg: 'La sesión expiró'
    }

    // comprobamos si hay token
    if (!token) {
        return res.status(401).json("Debes iniciar sesión")

    }


    try {

        // verificamos el token que recibimos es igual que la firma y recogemos el id del payload que nos devuelve el metodo verify
        const { idUsuario } = jwt.verify(token, process.env.JWTKey);

        // Asignamos este id a un campo de requets para poder usarlo en el controller
        req.idUsuario = idUsuario;

        next();


    } catch (error) {
        return res.status(401).json(responseError)
    }


}



module.exports = { validateJWt };




/*
    Este mioddleware nos sirve para revisar si el jwt de la peticiones es valido
    No lo usamos como helper porque esta función se usa como un middleware

    Esta función recibe 3 parametros la petición la respuesta y el next     

    El next lo que hace es que salte al siguiente middelware

    .- Primero leemos el jwt de nuestra petición que nos viene en el hedders bajo la clave Authorization

    .- Preguntamos si el token esta vacio. Si lo esta enviamos el error

    .- Si hay token comprobamos si es valido dentro de un try. Para ello utilizamos el metodo verify de jwt y le pasamos como parametros el token recibido y la firma 
       que la tenemos almacenaa en las variables de entorno y nos devuleve el payload. Por ello recogemos el id del payload Va dentro de una llave ya que la firma va 
       dentro de una llave y si no la ponemos jwt no lo va a reconocer

    .-  Añadimos este id a la petición para podaer usarla en el controlador. Al requets le asignamos un nuevo campo que igualammos al id recibido y en el controlaldro
        podemos usar esta campo

    .- Y por utlimo usamo el next, para que pueda paar al siguiente middeware si lo hubiera
   

    .- Una vez exportado lo podemos uar en las rutas
*/