const db = require('./db')

const User = db.sequelize.define('users', {

    username: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    password: {
        type: db.Sequelize.STRING
    },

    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    guardianName: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: true
    },

    brithDate: {
        type: db.Sequelize.DATE,
        require: true,
        allowNull: false
    },

    school: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    contact: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    isBatizado: {
        type: db.Sequelize.ENUM('Batizado', 'Não batizado'),
        require: true,
        allowNull: false,
        defaultValue: 'Não batizado'
    },

    batData: {
        type: db.Sequelize.DATE,
        require: true,
        allowNull: true
    },

    churchName: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: true
    },

    isAtive: {
        type: db.Sequelize.INTEGER,
        require: true,
        defaultValue: 0
    }

})

//User.sync({force:true})
module.exports = User