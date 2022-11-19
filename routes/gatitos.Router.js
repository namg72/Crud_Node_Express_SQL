const express = require("express");
const router = express.Router();


// importamos lo controladores
const { mostrarGatitos, insert, update, borrar } = require("../controllers/controllerGatitos")

// importamos el middelware

const validarNombreGatito = require("../middlewares/validatorInsertGatito.middleware")
const { validateJWt } = require("../middlewares/validatorJWT.middleware")

//RUTAS
router.get("/gatitos", mostrarGatitos);
router.post("/gatitos/insert", [validateJWt], insert);
router.delete("/gatitos/delete", borrar);
router.put("/gatitos/update", update)


//exportamos el router
module.exports = router;