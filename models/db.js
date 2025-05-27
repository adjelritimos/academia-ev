require('dotenv/config')
const  Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  port: process.env.PORT,
  host: process.env.DB_HOST,
})

module.exports = {
  Sequelize,
  sequelize
}