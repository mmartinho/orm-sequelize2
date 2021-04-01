const database = require('../models');
const Sequelize = require('sequelize');

const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {

    /**
     * Lista de pessoas ativas usando pessoasServices
     * @param {*} req 
     * @param {*} res 
     */
    static async pegaPessoasAtivas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    /**
     * Lista de pessoas usando pessoasServices
     * @param {*} req 
     * @param {*} res 
     */
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    /**
     * Visualiza uma pessoa
     * @todo usar pessoasServices 
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try{
            const umaPessoa = await database.Pessoas.findOne({ 
                where : { 
                    id : Number(id) 
                }
            });
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    /**
     * Acrescenta uma nova pessoa
     * @todo usar o pessoasServices
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(201).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    /**
     * Atualiza uma pessoa
     * @todo user o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Pessoas.update(novasInfos, { 
                where : { 
                    id : Number(id) 
                }
            });
            const pessoaAtualizada = await database.Pessoas.findOne({ 
                where : { 
                    id : Number(id) 
                }
            });
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }

    /**
     * Exclui uma pessoa
     * @see usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try{
            await database.Pessoas.destroy({ 
                where : { 
                    id : Number(id) 
                }
            });
            return res.status(200).json(`Pessoa com id ${id} excluída com sucesso`);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }

    /**
     * Restaura uma pessoa excluída
     * @todo user o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try{
            await database.Pessoas.restore({ 
                where : { 
                    id : Number(id) 
                }
            });
            return res.status(200).json(`Pessoa com id ${id} restaurada com sucesso`);
        } catch (error) {
            return res.status(500).json(error.message);
        }         
    }

    /**
     * Visualiza a matricula da pessoa
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            const umaMatricula = await database.Matriculas.findOne({ 
                where : { 
                    id : Number(matriculaId),
                    estudante_id : Number(estudanteId) 
                }
            });
            return res.status(200).json(umaMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }  
    
    /**
     * Cria uma nova matricula para pessoa
     * @todo usar o pessoaService
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async criaMatricula(req, res) {
        const { estudanteId } = req.params; 
        const novaMatricula = {...req.body, estudante_id : Number(estudanteId) };
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(201).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } 
    
    /**
     * Atualiza matricula de pessoa
     * @todo usar o pessoaService
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params; 
        const novasInfos = req.body;
        try {
            await database.Matriculas.update(novasInfos, { 
                where : { 
                    id : Number(matriculaId),
                    estudante_id : Number(estudanteId) 
                }
            });
            const matriculaAtualizada = await database.Matriculas.findOne({ 
                where : { 
                    id : Number(matriculaId) 
                }
            });
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }  
    
    /**
     * Exclui a matrícula da pessoa
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params; 
        try{
            await database.Matriculas.destroy({ 
                where : { 
                    id : Number(matriculaId),
                    estudante_id : Number(estudanteId)   
                }
            });
            return res.status(200).json(`Matricula com id ${matriculaId} excluída com sucesso`);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }  
    
    /**
     * Restaura uma matricula excluída
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.restore({ 
                where : { 
                    id : Number(matriculaId),
                    estudante_id : Number(estudanteId)  
                }
            });
            return res.status(200).json(`Matrícula com id ${matriculaId} restaurada com sucesso`);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }   
    
    /**
     * Mostra todas as matriculas da pessoa
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params; 
        try{
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } });
            /**
             * Usando escopo de associação
             * @see api\models\pessoas.js
             */
            const matriculas = await pessoa.getAulasMatriculadas();
            const total = await pessoa.countAulasMatriculadas();
            return res.status(200).json( { matriculas: matriculas, total : total });
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }   
    
    /**
     * Mostra todas as matriculas em uma turma
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params; 
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where : {
                    turma_id : Number(turmaId),
                    status : 'confirmado'
                }
            });
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    } 
    
    /**
     * Mostra todas as matriculas em uma turma
     * @todo usar o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2; 
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where : {
                    status : 'confirmado'
                },
                attributes : ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            });
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }  
    
    /**
     * Inativa um estudante e cancela suas matriculas
     * @see cancelaPessoa() que já está com o pessoasService
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async cancelaPessoaSemServices(req, res) {
        const { estudanteId } = req.params;
        try {
            /**
             * Transação GERENCIADA (usa callback) 
             * de atualização em várias tabelas
             */
            database.sequelize.transaction(async transacao => {
                /** Desativa estudante */
                await database.Pessoas.update(
                    { ativo: false }, 
                    { where: { id: Number(estudanteId) } },
                    { transaction: transacao }
                );
                /** Cancela todas as suas matrículas */
                await database.Matriculas.update(
                    { status: 'cancelado' }, 
                    { where: { estudante_id: Number(estudanteId) } },
                    { transaction : transacao }
                );    
            });
            const matriculasCanceladas = await database.Matriculas.findAll(
                { where: { estudante_id: Number(estudanteId) } }
            );
            return res.status(200).json({ 
                message: `Estudante ${estudanteId} inativado`, 
                matriculasCanceladas : matriculasCanceladas 
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    } 
    
    /**
     * Inativa um estudante e cancela suas matriculas
     * usando o pessoasServices
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            const matriculasCanceladas = await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
            return res.status(200).json({ 
                message: `Estudante ${estudanteId} inativado`, 
                matriculasCanceladas : matriculasCanceladas 
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }    
    
};

module.exports = PessoaController;