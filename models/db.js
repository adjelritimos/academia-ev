require('dotenv/config')
const  Sequelize = require('sequelize')


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