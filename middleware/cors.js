const config = require('../config');

function cosrDelegate(req, res, next) {
    if (config.whiteList.length === 0 || config.whiteList.indexOf(req.header('Origin')) !== -1) {
        next()
    } else {
        return res.status(500).send({ message: 'Origen No autorizado para realizar consultas' });
    }
}

module.exports = cosrDelegate;