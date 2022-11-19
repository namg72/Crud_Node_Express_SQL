const express = require("express");
// Creamos el objeto controlle
const controllerGatitos = {};

// Imprtamos la coneaxion a la bad
const connectDB = require("../DBConfig/databaseConfig")

// importamos el middlwqre del token
const { validateJWt } = require("../middlewares/validatorJWT.middleware")


// Función para validar el nombre de gato
const { validationResult } = require("express-validator");







// Insertar gatitos
controllerGatitos.insert = ((req, res) => {


    const validator = validationResult(req);
    if (validator.errors.length > 0) {
        res.status(400).json(validator.errors)
        return;
    }

    try {
        const { nombre } = req.body;
        const { idUsuario } = req

        let query = "INSERT INTO gatitos (nombre, fk_usuario) VALUES (?, ?);"
        connectDB.query(query, [nombre, idUsuario], (err, rows) => {
            if (err) throw err;

            res.send(`Gatito insertado`)

            console.log(idUsuario);
        });

    } catch (error) {
        res.send(error);
    }
})

// Mostar gatitos

controllerGatitos.mostrarGatitos = ((req, res) => {

    const query = 'SELECT * FROM GATITOS';

    try {

        connectDB.query(query, (err, rows) => {

            if (err) { throw err; }

            res.status(200).send(rows)
        })

    } catch (error) {
        console.log(error);
    }

})




// Borrar gatitos

controllerGatitos.borrar = ((req, res) => {

    const { idGatito } = req.body
    const query = "DELETE FROM gatitos WHERE idGatito = ?;"

    try {

        connectDB.query(query, [idGatito], (err, rows) => {

            if (err) throw err;

            res.status(200).send(`Gatito con id: ${idGatito} borrado `)

        })

    } catch (error) {
        console.log(error);
    }

})

controllerGatitos.update = ((req, res) => {

    const { nombre, idGatito } = req.body
    const query = "UPDATE gatitos SET nombre= ? WHERE idGatito=?;"

    try {

        connectDB.query(query, [nombre, idGatito], (err, rows) => {

            if (err) throw err;

            res.status(200).send(`se ha cambiado el nombre al gatito con id: ${idGatito}`)

        })

    } catch (error) {
        console.log(error);
    }

})


module.exports = controllerGatitos;