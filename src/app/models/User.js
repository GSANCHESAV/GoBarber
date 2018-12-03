const bcrypt = require('bcryptjs')
// O sequelize E O Datatypes VEM DO ARQUIVO index.js DA PASTA 'models'

// sequelize É A INSTANCIA DO SEQUELIZE QUE FAZ A CONEXAO COM O DB
// DataTypes É OS TIPOS DE COLUNAS QUE NÓS PODEMOS UTILIZAR
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      // O TIPO VIRTUAL SOÓ EXISTE NA NOSSA APP E NÃO NA DB.
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // NOS hooks(do sequelize) FAZEMOS AUTOMATIZAÇÃO DE PROCESSOS MANIPULANDO
      // OS DADOS QUE SERÃO SALVOS E ISSO EM VARIAS PARTES DO PROCESSO.
      hooks: {
        // AQUI A OPERAÇÃO SERÁ FEITA ANTES DE SALVAR OS DADOS NO DB.
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  // METODO CRIADO PARA CERIFICAÇÃO DA SENHA NA PROCESSO DE AUTENTICAÇÃO
  User.prototype.checkPassword = function (password) {
    // O bcrypt USA O METODO .compare PARA VER SE A SENHA DIGITADA (password)
    // É IGUAL A SENHA SALVA NO DB CRIPTOGRAFADA NO HASH CODE (password_hash)
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
