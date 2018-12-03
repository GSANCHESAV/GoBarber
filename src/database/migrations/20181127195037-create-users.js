'use strict'

module.exports = {
  /*
  AQUI É CRIADA TODA ESTRUTURA DA TABELA DE DADOS INCLUSIVE
  OS CAMPOS QUE NÃO DECLARAMOS NO ARQUIVO DO MODEL 'User.js'.
  NO CASO O created_at E updated_at.
  */
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provider: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  // USADO PARA DELETAR A TABELA CRIADA
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
