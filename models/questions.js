const Command = require('./commands')
const db = require('./db')
const Lemma = require('./lemmas')
const Lesson = require('./lessons')


const Question = db.sequelize.define('questions', {

    question: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    correct_answer: {
        type: db.Sequelize.STRING,
        require: true,
        allowNull: false
    },

    lessonId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Lesson,
            key: 'id'
        },
        allowNull:true,
        onDelete: 'CASCADE'
    },

    commandId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Command,
            key: 'id'
        },
        allowNull:true,
        onDelete: 'CASCADE'
    },

    lemmaId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Lemma,
            key: 'id'
        },
        allowNull:true,
        onDelete: 'CASCADE'
    },

})

Command.hasMany(Question, { foreignKey: 'commandId', as: 'questions', onDelete: 'CASCADE' })
Lemma.hasMany(Question, { foreignKey: 'lemmaId', as: 'questions', onDelete: 'CASCADE' })
Lesson.hasMany(Question, { foreignKey: 'lessonId', as: 'questions', onDelete: 'CASCADE' })

Question.belongsTo(Command, { foreignKey: 'commandId', as: 'command' })
Question.belongsTo(Lemma, { foreignKey: 'lemmaId', as: 'lemma' })
Question.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' })

//Question.sync({force:true})

module.exports = Question
