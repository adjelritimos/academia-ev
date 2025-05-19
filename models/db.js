const Sequelize = require('sequelize')
const path = require('path')

const databasePath = path.join(__dirname, 'database.db')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath
})

module.exports = {
  Sequelize,
  sequelize
}