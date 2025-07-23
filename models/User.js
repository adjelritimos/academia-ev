const db = require('./db')

const User = db.sequelize.define('users', {   

    username: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    password: {
        type: db.Sequelize.STRING
    },

    isAtive:{
        type: db.Sequelize.INTEGER,
        require: true,
        defaultValue: 0
    }
    
})

//User.sync({force:true})
module.exports = User