module.exports = {
  dialect: 'postgres', // tipo do DB
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2', // nome do DB
  operatorAliases: false,
  define: {
    timestamps: true, // adiciona as colunas CREATED AT e UPDATED AT por padrao na Tabela
    underscored: true, // snakecase nos nomes (usa o _ )
    underscoredAll: true // snakecase nos nomes
  }
}
