const db = require('./db')

const Command = db.sequelize.define('commands', {   

    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    description: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: false
    },

    demonstration: {
        type: db.Sequelize.TEXT,
        allowNull: true
    },

    sound: {
        type: db.Sequelize.TEXT,
        allowNull: true
    }

})


//Command.sync({alter:true})
module.exports = Command