const database = require('../models');

const Services = require('../services/Services');
const niveisServices = new Services('Niveis');

class NivelController {
    /**
     * Lista de níveis
     * @param {*} req 
     * @param {*} res 
     */
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await niveisServices.pegaTodosOsRegistros();
            return res.status(200).json(todosOsNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } 

    /**
     * Visualiza dados de um nivel
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async pegaUmNivel(req, res) {
        const { id } = req.params;
        try {
          const umNivel = await database.Niveis.findOne( { 
            where: { 
              id: Number(id) 
            }
          });
          return res.status(200).json(umNivel);
        } catch (error) {
          return res.status(500).json(error.message);
        }
    }
    
    /**
     * Cria um novo nivel
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async criaNivel(req, res) {
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(200).json(novoNivelCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    
    /**
     * Atualiza dados de um nivel
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async atualizaNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
          await database.Niveis.update(novasInfos, { where: { id: Number(id) }});
          const nivelAtualizado = await database.Niveis.findOne( { where: { id: Number(id) }});
          return res.status(200).json(nivelAtualizado);
        } catch (error) {
          return res.status(500).json(error.message);
        }
    }
    
    /**
     * Exclui um nivel
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async apagaNivel(req, res) {
        const { id } = req.params;
        try {
          await database.Niveis.destroy({ where: { id: Number(id) }});
          return res.status(200).json({ mensagem: `id ${id} deletado` });
        } catch (error) {
          return res.status(500).json(error.message);
        }
    }
    
    /**
     * Restaura uma nivel excluído
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
     static async restauraNivel(req, res) {
      const { id } = req.params;
      try{
          await database.Niveis.restore({ 
              where : { 
                  id : Number(id) 
              }
          });
          return res.status(200).json(`Nível com id ${id} restaurado com sucesso`);
      } catch (error) {
          return res.status(500).json(error.message);
      }         
  }    
};

module.exports = NivelController;