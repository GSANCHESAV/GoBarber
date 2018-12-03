const path = require('path')

class FileController {
  show (req, res) {
    // file É O NOME DA VARIAVEL QUE TEM O NOME DA IMAGEM NO {{ provider.avatar }}
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )
    // RETORNA O CAMINHO CORRETO DE ONDE ESTA A IMAGEM PARA O src DO <img>
    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
