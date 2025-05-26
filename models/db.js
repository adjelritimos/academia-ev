require('dotenv').config() // Carrega as variáveis do .env
const  Sequelize = require('sequelize')

// Verifica se a variável de ambiente existe
if (!process.env.DB_URL) {
  throw new Error('Variável de ambiente DB_URL não está definida')
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

module.exports = {
  Sequelize,
  sequelize
}