// limpiamos la consola
//console.clear();

// Nos traemos express y lo inicializamos

const express = require("express");
const app = express();

// importamos las rutas
const autoresRouter = require("./routes/autoresRouter")
const userRouter = require("./routes/userRouter")
const gatitosRouter = require("./routes/gatitos.Router")

// importamos la conexion a la bd
const connectDB = require("./DBConfig/databaseConfig")

// requerimos las variables de entorno para que ppodenros traer el puerto de esucha
require('dotenv').config();

//importamos las cors y la usamoms.Esto sirve para que el navegador acepte todas las peticiones y no las bloquee por ejemplo cuando trabajamos 
//en local y hacemoms peticiones de local a locasl
const cors = require("cors");
app.use(cors());


// MIDDLEWARES
app.use(express.json());

// RUTAS
app.use(autoresRouter);
app.use(userRouter);
app.use(gatitosRouter);

// PUERTO DE ESCUCHA (Lo tenemos definido en una variable de entorno)
app.listen(process.env.SERVER_PORT, () => {

    console.log(`servidor escuchando en localhost:${process.env.SERVER_PORT}`);
})