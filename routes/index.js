"use Strict";
const express = require("express");
const EventoController = require("../controllers/eventos");
const BoleteriaController = require("../controllers/boleteria");
const api = express.Router();

/**
 * Url para carga de los Eventos
 */
api.get("/eventos/all", EventoController.obtenerEventos);
api.post("/eventos/guardarEvento", EventoController.guardarEvento);
api.delete("/eventos/borrar/:id", EventoController.eliminarEvento);

/**
 * Url carga de boleteria
 */

api.post("/boleteria/guardar", BoleteriaController.agregarBoleta);
api.delete("/boleteria/borrar/:id", BoleteriaController.eliminarBoleta);
api.post("/boleteria/vender", BoleteriaController.venderBoleta);

module.exports = api;
