const db = require('./db')

const User = db.sequelize.define('members', {

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

    nbi: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false,
        defaultValue: '0000000000'
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
        allowNull: true,
        defaultValue: null
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
