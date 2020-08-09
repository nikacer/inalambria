let mysql = require("mysql");
require("dotenv").config();

let dataCon = {
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
};

function consultarBD(query) {
  const connection = mysql.createConnection(dataCon);
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error(`Error en la conexion -> ${JSON.stringify(err)}`);
        reject(err);
      }
    });

    connection.query(query, (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });

    connection.end();
  });
}

const insertarBD = async (tabla, datos) => {
  try {
    let secc1 = ` INSERT INTO ${tabla} (`;
    let secc2 = `) VALUES (`;
    Object.keys(datos).forEach((dato, i) => {
      let coma = "";
      if (i > 0) coma = ",";
      secc1 = secc1.concat(coma + dato);
      secc2 = secc2.concat(`${coma}"${datos[dato]}"`);
    });
    return await guardarDB(secc1 + secc2 + ")");
  } catch (err) {
    console.error(`Se a presentado el siguiente error: ${JSON.stringify(err)}`);

    res.status(500).send({ save: false });
  }
};

const editarDB = async (tabla, datos, condicion) => {
  try {
    let secc1 = `UPDATE ${tabla} set `;
    let secc2 = ` WHERE ${condicion}`;
    Object.keys(datos).forEach((dato, i) => {
      let coma = "";
      if (i > 0) coma = ",";
      secc1 = secc1.concat(`${coma}${dato}="${datos[dato]}"`);
    });
    return await guardarDB(secc1 + secc2);
  } catch (err) {
    console.error(`Se a presentado el siguiente error: ${JSON.stringify(err)}`);

    res.status(500).send({ save: false });
  }
};

const eliminarDB = async (tabla, id) => {
  try {
    const query = `DELETE FROM ${tabla} WHERE id="${id}"`;
    console.log(query);
    const resp = await guardarDB(query);
    return resp;
  } catch (err) {
    console.error(`Se a presentado el siguiente error: ${JSON.stringify(err)}`);
    res.status(500).send({ del: false });
  }
};

const guardarDB = async (query) => {
  try {
    const connection = mysql.createConnection(dataCon);
    connection.query(query, (error, results, fields) => {
      if (error) throw error;
      return results;
    });
    connection.end();
  } catch (err) {
    console.error(`Se a presentado el siguiente error: ${JSON.stringify(err)}`);
    res.status(500).send({ save: false });
  }
};

module.exports = {
  consultarBD,
  insertarBD,
  editarDB,
  eliminarDB,
};
