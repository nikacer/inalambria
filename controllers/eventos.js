"use Strict";

let bd = require("../services/bd");

module.exports = {
  obtenerEventos: async (req, res) => {
    try {
      const eventos = await bd.consultarBD("CALL eventos()");
      const boletas = await bd.consultarBD("CALL boleteria()");
      return res.status(200).send({
        eventos: eventos[0],
        boleteria: boletas[0],
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  guardarEvento: (req, res) => {
    try {
      const data = req.body;
      if (!data.id || data.id === "") {
        delete data.id;
        bd.insertarBD("eventos", data).then(() =>
          res.status(200).send({ save: true })
        );
      } else {
        const condicion = `id = ${data.id}`;
        delete data.id;
        bd.editarDB("eventos", data, condicion).then(() =>
          res.status(200).send({ save: true })
        );
      }
    } catch (err) {
      res.status(500).send({ save: false });
    }
  },

  eliminarEvento: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      bd.eliminarDB("eventos", id).then(() =>
        res.status(200).send({ del: true })
      );
    } catch (err) {
      res.status(500).send({ del: false, err });
    }
  },
};
