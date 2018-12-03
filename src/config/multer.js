const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

module.exports = {
  // SALVA AS IMAGENS EM DISCO NO NOSSO PROJETO MESMO
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)
        // FAZ A CONCATENAÇÃO ENTRE UM NUMERO ALEATÓRIO E O NOME ORIGINAL DA IMAGEM
        // PARA QUE IMAGENS COM O MESMO NOME NÃO GEREM CONFLITOS NO DB
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
