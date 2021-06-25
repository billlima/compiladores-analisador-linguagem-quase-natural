var interpretador = require('../../src/index')

module.exports = app => {

    app.post('/interpretador', (req, res) => {
        var retorno = interpretador.interpretar(req.body.texto)
        res.send(retorno)
    })
}