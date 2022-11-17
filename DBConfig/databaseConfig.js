//nos traemos el modul sql
const mysql = require("mysql");


// Nos tramemos la variable de entorno

const dotenv = require("dotenv");
dotenv.config();

//parametrizamos la conexdion

const conexion = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

})

//nos conectamos a la base de datos
conexion.connect((err) => {
    if (err) {
        throw err
        console.log(`No se ha podido conectar a la base de datos ${process.env.DB_DATABASE} ${err.message}`);

    } else console.log(`Conectado correctamente a la base de datos ${process.env.DB_DATABASE}`);

})

module.exports = conexion;