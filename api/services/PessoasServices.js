const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    /**
     * @param {*} where 
     * @returns 
     */
    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo].findAll({ where : {
            ...where
        }});
    }

    /**
     * @param {*} where 
     * @returns 
     */
    async pegaTodosOsRegistros(where = {}) {
        return database[this.nomeDoModelo].scope('todos').findAll({ where : { 
            ...where 
        }});
    }

    /**
     * Transação GERENCIADA (usa callback) 
     * de atualização em várias tabelas para inativar 
     * um estudante e cancelar todas as suas matriculas
     * @param {*} estudanteId 
     * @returns 
     */
    async cancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ativo : false},estudanteId, {transaction: transacao});
            await this.matriculas.atualizaRegistros({status : 'cancelado'}, { estudante_id : estudanteId}, {transaction: transacao});
            return await database.Matriculas.findAll(
                { where: { estudante_id: Number(estudanteId) } }
            );
        });
    }
}

module.exports = PessoasServices;