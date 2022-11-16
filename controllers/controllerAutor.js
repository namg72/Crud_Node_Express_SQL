//creamos el objeto controller
const controllerAutor = {};

//importamos la conexion a la bd
const connectDB = require("../DBConfig/databaseConfig.js");


//MOSTRAR AUTOR
controllerAutor.autores = ((req, res) => {

    let query = `SELECT * FROM autor`

    try {

        connectDB.query(query, (err, rows) => {
            if (err) throw err;
            res.send(rows)
        })

    } catch (err) {
        res.send(res.statusCode + "Error de servidor")
        console.log(err);
    }



})

//INSERTAR AUTOR
controllerAutor.insertAutor = ((req, res) => {
    //datos estraidos del body
    const { nombre, apellidos, fecha_nacimiento, nacionalidad, edad } = req.body;

    let query = `INSERT INTO autor (nombre) VALUES (?)`;

    //encerramos la consulta en un try catch para controlar los posbiles errors
    try {
        connectDB.query(query, [nombre, apellidos, fecha_nacimiento, nacionalidad, edad], (err, row, fields) => {
            if (err) throw err; //este trows pertenece al try catch internon que maneja express

            res.send("Se ha insertado el autor correctamente")
        });

    } catch (err) {
        res.send(res.statusCode + "Error de servidor")
        console.log(err);

    }
})

//BORRAR AUTOR
controllerAutor.deleteAutor = ((req, res) => {
    const { id } = req.body;

    let query = `DELETE FROM autor WHERE idautor = ?`

    try {
        connectDB.query(query, [id], (err, rows, fields) => {
            if (err) throw err;

            res.send(`autor con id. ${id} ha sido borrado`)


        })


    } catch (error) {
        res.send(res.statusCode + "Error de servidor")
        console.log(err);

    }

})

//MODIFICAMOS  NOMBRE AUTOR
controllerAutor.updateAutor = ((req, res) => {
    const { nombre, id } = req.body;

    let query = `UPDATE autor SET nombre= ? WHERE idautor = ?`

    try {
        connectDB.query(query, [nombre, id], (err, rows, fields) => {
            if (err) throw err;

            res.send(`autor con id. ${id} ha sido modificado`)
        })

    } catch (error) {
        res.send(res.statusCode + "Error de servidor")
        console.log(err);

    }

})

//exportamos el objeto
module.exports = controllerAutor