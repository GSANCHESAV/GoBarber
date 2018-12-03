// server é equivalente ao App().express exportado
const server = require('./server')

// caso não seja passado uma variavel ambiente chamada PORT (ele usa a 3000)
server.listen(process.env.PORT || 3000)
