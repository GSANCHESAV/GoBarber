// MIDDLEWARE DE VERIFICAÇÃO SE O USUÁRIO ESTÁ AUTENTICADO OU NÃO
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // COLOCA OS DADOS DO USUARIO DISPONIVEIS PARA TODOS OS OUTROS ARQUIVOS
    // UTILIZADOS NO CODIGO
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
