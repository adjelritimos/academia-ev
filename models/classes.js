const db = require('./db')

const Classe = db.sequelize.define('classes', {   

    title: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    tytpes: {
        type: db.Sequelize.ENUM('prática', 'teórica'),
        require: true,
        allowNull: false
    },

    data: {
        type: db.Sequelize.DATE,
        require: true,
        allowNull: true
    }
})


//Classe.sync({force:true})
module.exports = Classe