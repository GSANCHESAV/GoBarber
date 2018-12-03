const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não cadastrado!')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    // SALVANDO UMA NOVA INFORMAÇÃO NA SESSAO CHAMADA USER COM A INFORMACAO DO USUARIO
    req.session.user = user

    return res.redirect('app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      // ELIMINA OS DADOS NO COOKIE COM O NOME root ONDE O FRONT-END
      // ENVIA PARA O BACK-END AVISANDO QUE O USUARIO ESTA LOGADO
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
