'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey : 'docente_id'});
      Pessoas.hasMany(models.Matriculas, { foreignKey : 'estudante_id'});
    }
  };
  Pessoas.init({
    /**
     * Atributos
     */
    nome: {
      type: DataTypes.STRING,
      /** 
       * Validação customizada
       */
      validate : {
        funcaoValidadora: function(dado) {
          if(dado.length < 3) { 
            throw new Error('O campo nome deve ter mais de 3 caracteres'); 
          }
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
        type: DataTypes.STRING,
        /** 
         * Validação pronta de verificação 
         * formato de email 
         */
        validate : {
          isEmail : { 
            args: true,
            msg: "Dado do tipo e-mail inválido"
          }
        }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    /**
     * Fixa o nome do modelo
     */
    modelName: 'Pessoas',
    /**
     * Habilita o "soft delete"
     * Necessita coluna "deletedAt"
     */
    paranoid : true,
    /**
     * Escopo Padrão: Toda consulta na tabela 
     * pessoas possui essa clausula
     */
    defaultScope: {
      where : { ativo : true }
    },
    scopes: {
      /** Escopos customizados */
      todos : { where : { } }
    }
  });
  return Pessoas;
};