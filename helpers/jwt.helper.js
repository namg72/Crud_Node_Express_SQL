// Importamos el jwt
const jwt = require("jsonwebtoken");


//Funcion para crar el jsonwebtoken

const crearJWT = (idUsuario) => {

    return new Promise((resolve, reject) => {

        const payload = {
            idUsuario: idUsuario
        };

        jwt.sign(payload, process.env.JWTKey, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                reject("No se pude generar el jwt")
            } else {
                resolve(token)
            }

        })

    })

}


module.exports = { crearJWT };









/*========================================== C R E A R  J  W  T=================================================

 Funcion para crear el token, le pasamos el id del iusuario por parametro y nos devueve una promera

 .- Primero tenemos que construir el payload del jwt 
    En el payload le indicamos la información (no comprometida) del usuario que definamos nosotros, en este caso
    solo le vamos a pasar el id del usuario

  .- Con la funcion sign() creamos la firmna del jwt. Esta firma es secreta y conteine información que SOLO está en
     el servidor. La vamos a poner en una variable de entornos en nuestro fichero .env
     Esta firma tiene la creamos nosotros yu tienne que tener muchos caracteres para que sea segura

     Express no trbaja con variables de entorno por lo que tenemos que importar ese paquete  (mpm i dotenv)


   .- Sing() recibe varios parametros;
   
        1_  El payload, 
        2.- La firma creada
        3.- Opciones:
                Las opciones son objeto y tiene atributos como por eemplo el tiempo de expiracion del token. 
                Si no le indicamos nada el token no expirará nunca
        4,. Un callback que recibe como parametros un error y el token y es es que resuelve la promesa
            Si hay un error lo definmos en el reject
            Y si todo va bien devolvemos el tokden en el resolve
       

      
    .- Por ultimo lo exportamos y lo usamos en el controlador





*/