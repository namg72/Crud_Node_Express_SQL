const express = require("express");
const router = express.Router();


// importamos lo controladores
const { mostrarGatitos, insert, update, borrar } = require("../controllers/controllerGatitos")

// importamos el middelware
const validarNombreGatito = require("../middlewares/validatorInsertGatito.middleware")

//RUTAS
router.get("/gatitos", mostrarGatitos);
router.post("/gatitos/insert", [validarNombreGatito()], insert);
router.delete("/gatitos/delete", borrar);
router.put("/gatitos/update", update)


//exportamos el router
module.exports = router;