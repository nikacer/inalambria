"use Strict";

let bd = require("../services/bd");
const { response } = require("../app");

module.exports = {
  agregarBoleta: (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      if (data.id) {
        const condicion = `id = ${data.id}`;
        delete data.id;
        bd.editarDB("boleteria", data, condicion).then(() => {
          res.status(200).send({ save: true });
        });
      } else {
        bd.insertarBD("boleteria", data).then(() => {
          res.status(200).send({ save: true });
        });
      }
    } catch (err) {
      res.status(500).send({ save: false });
    }
  },
  eliminarBoleta: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      bd.eliminarDB("boleteria", id).then(() =>
        res.status(200).send({ del: true })
      );
    } catch (err) {
      res.status(500).send({ del: false, err });
    }
  },
  venderBoleta: (req, res) => {
    try {
      const data = req.body;
      bd.insertarBD("adquirirBoleta", data).then(() => {
        res.status(200).send({ vender: true });
      });
    } catch (err) {
      res.status(500).send({ vender: false });
    }
  },
};
