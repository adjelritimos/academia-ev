const db = require('./db')
const Question = require('./questions')


const Answer = db.sequelize.define('answers', {

    answer: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    questionId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Question,
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
})

Question.hasMany(Answer, { foreignKey: 'questionId', as: 'answers', onDelete: 'CASCADE' })
Answer.belongsTo(Question, { foreignKey: 'questionId', as: 'question' })

//Answer.sync({force:true})

module.exports = Answer
