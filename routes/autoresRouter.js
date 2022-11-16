//Nos trameos el modulo Router de exptess
const express = require("express");
const router = express.Router();

//Importamos el controlador
const { autores, insertAutor, deleteAutor, updateAutor } = require("../controllers/controllerAutor")

//Ruta autores
router.get("/autores", autores);

//Ruta insertar autors
router.post("/autores/insert", insertAutor);

//Ruta borrar autores
router.delete("/autores/delete", deleteAutor);

//Ruta modfiicar nombre autorç
router.put("/autores/update", updateAutor);

//Exportamos router
module.exports = router