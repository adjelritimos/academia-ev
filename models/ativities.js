const db = require('./db')

const Ativity = db.sequelize.define('ativities', {

    title: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    descricao: {
        type: db.Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    data: {
        type: db.Sequelize.DATE,
        allowNull: false
    }

})

//Ativity.sync({force:true})
module.exports = Ativity
