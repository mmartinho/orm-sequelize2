const bodyParser = require('body-parser');
const pessoasRoute = require('./pessoasRoute');
const niveisRoute = require('./niveisRoute');
const turmasRoute = require('./turmasRoute');

module.exports = (app) => {
    app.use(bodyParser.json());

    /**
     * Middleware: Todas as rotas de pessoas
     */
    app.use(pessoasRoute);

    /**
     * Middleware: Todas as rotas níveis
     */
    app.use(niveisRoute);

    /**
     * Middleware: Todas as rotas de turmas
     */
    app.use(turmasRoute);
}