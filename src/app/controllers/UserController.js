const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  // BUSCA OS DADOS ENVIADOS PELO NOSSO FORMULARIO E CRIA UM NOVO USUARIO
  async store (req, res) {
    // COMO A IMAGEM NÃO ESTAÁ NO req.body E SIM NO req.file DEVEMOS IMPORTA-LA
    // E PASSAR A IMAGEM PARA O COMANDO DE CRIAÇÃO DO USUARIO NO DB.
    const { filename: avatar } = req.file

    await User.create({ ...req.body, avatar })
    // REDIRECIONA PARA A PAGINA INICIAL DEPOIS QUE TERMINA O PROCESSO
    return res.redirect('/')
  }
}

module.exports = new UserController()
