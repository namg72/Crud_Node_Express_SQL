// Nos traemos express y lo inicializamos

const express = require("express");
const app = express();

// importamos las rutas
const autoresRouter = require("./routes/autoresRouter")
const userRouter = require("./routes/userRouter")

// importamos la conexion a la bd
const connectDB = require("./DBConfig/databaseConfig")

// requerimos las variables de entorno para que ppodenros traer el puerto de esucha
require('dotenv').config();

// MIDDLEWARES
app.use(express.json());

// RUTAS
app.use(autoresRouter);
app.use(userRouter);

// PUERTO DE ESCUCHA (Lo tenemos definido en una variable de entorno)
app.listen(process.env.PORT, () => {

    console.log(`servidor escuchando en localhost:${process.env.PORT}`);
})