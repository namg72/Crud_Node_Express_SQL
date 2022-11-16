//nos traemos el modul sql
const mysql = require("mysql");

//parametrizamos la conexdion

const conexion = mysql.createConnection({
    host: 'localhost',
    port: 3360,
    user: 'root',
    password: '',
    database: 'libreria'

})

//nos conectamos a la base de datos
conexion.connect((err) => {
    if (err) {
        throw err
        console.log(`No se ha podido conectar a la base de datos ${conexion.config.database} ${err.message}`);

    } else console.log(`Conectado correctamente a la base de datos ${conexion.config.database}`);

})

module.exports = conexion;