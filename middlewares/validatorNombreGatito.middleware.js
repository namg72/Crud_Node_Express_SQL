//requerimos el metodo check del paquete express-validator;
const express = require("express")
const { check } = require("express-validator");

const validarNombreGatito = () => {


    return check("nombre", "El nombre del gatito es obligatorio").not().isEmpty()

}

module.exports = { validarNombreGatito }