const db = require('./db')

const Module = db.sequelize.define('modules', {   

    name: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

})

//Module.sync({force:true})
module.exports = Module