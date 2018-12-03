// CASO O USUARIO ESTEJA LOGADO E ACESSAR A PAGINA ELE REDIRECIONA PARA O DASHBORD
module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }

  return res.redirect('/app/dashboard')
}
