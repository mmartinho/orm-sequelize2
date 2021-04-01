const database = require('../models');

class Services {
    /**
     * @param {*} nomeDoModelo 
     */
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    /**
     * @returns 
     */
    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll();
    }

    async pegaUmRegistro(id) {

    }

    async criaRegistro(dados) {

    }

    /**
     * Atualiza um registro
     * @param {*} dadosAtualizados 
     * @param {*} id 
     * @param {*} transacao 
     * @returns 
     */
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where : { id : id}}, transacao);
    }

    /**
     * Atualiza vários registros
     * @param {*} dadosAtualizados 
     * @param {*} where 
     * @param {*} transacao 
     * @returns 
     */
    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo].update(dadosAtualizados, { where : { ...where} }, transacao);
    }

    async apagaRegistro(id) {
        
    }
}

module.exports = Services;