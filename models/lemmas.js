const db = require('./db')

const Lemma = db.sequelize.define('lemmas', {   

    question: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    answer: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: false
    },

    sound: {
        type: db.Sequelize.TEXT,
        require: true,
        allowNull: true
    }
})


//Lemma.sync({alter:true})
module.exports = Lemma