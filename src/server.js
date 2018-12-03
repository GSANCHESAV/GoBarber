const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const path = require('path')
const flash = require('connect-flash')
const dateFilter = require('nunjucks-date-filter')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret',
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    // Pasta onde vão estar as Views
    // O path.resolve resolve problemas de caminho relativo
    const env = nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })
    // PARA QUE A FUNÇÃO POSSA SER UTILIZADA DENTRO DOS VIEWS
    env.addFilter('date', dateFilter)

    // FAZ COM QUE O EXPRESS ENCONTRE A PASTA "public" COM OS ARQUIVOS ESTATICOS
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    // CONFIGURA O FORMATO UTILIZADO PELA 'view engine', NO CASO 'njk'
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
