const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');


// importamos el checkSchema para tratar el error del fitrado de la imagen
const { checkSchema } = require("express-validator")


// importamos lo controladores
const { mostrarGatitos, insert, update, borrar } = require("../controllers/controllerGatitos")

// importamos el middelware
const { validateJWt } = require("../middlewares/validatorJWT.middleware");
const { request } = require("http");
//const { validarNombreGatito } = require("../middlewares/validatorNombreGatito.middleware")


const storage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, 'images')
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
});


const loadFile = multer({

    storage: storage,
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const validFile = (ext === '.png' || ext === '.jpg' || ext === '.gif' || ext === '.jpeg');
        callback(null, validFile)
    }
})






//RUTAS
router.get("/gatitos", mostrarGatitos);

router.post("/gatitos/insert", [
    validateJWt,
    loadFile.single('foto'),
    checkSchema({
        'foto': {
            custom: {
                options: (value, { request, path }) => !!request.file['path'],
                errorMessage: 'La imagen es obligatoria'
            }
        }
    })

], insert);

router.delete("/gatitos/delete", borrar);

router.put("/gatitos/update", update)


//exportamos el router
module.exports = router;






/* Si el filtro del loadFiele que nos devule el hellper del sotorageImg nos da un error hay que tratarlo con "checkSchbema" que hay que imprtarlo de express-validatro
   que recibe como parametros un objeto
      que define el camñpo foto que lo validadmos con custom que recibe varios campos:
         - opti¡ons que recibe como el campos value y un objeto que recibe el req y la ruta  


*/