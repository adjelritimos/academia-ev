const Sequelize = require('sequelize')

const sequelize = new Sequelize('academia', 'root', 'Sqlcom100%', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = {
  Sequelize,
  sequelize
}