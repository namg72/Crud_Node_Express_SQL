const express = require("express");
const router = express.Router();

const controllerGatitos = require("../controllers/controllerGatitos");

// importamos lo controladores
const { mostrarGatitos, insert, update, borrar } = require("../controllers/controllerGatitos")



const { check } = require("express-validator")

//RUTAS
router.get("/gatitos", mostrarGatitos);
router.post("/gatitos/insert", [
    check("nombre", "El nombre del gatito es obligatorio").not().isEmpty()

], insert);
router.delete("/gatitos/delete", borrar);
router.put("/gatitos/update", update)


//exportamos el router
module.exports = router;