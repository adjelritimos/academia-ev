const db = require('./db')
const Module = require('./modules')


const Lesson = db.sequelize.define('lessons', {

    content: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    body: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },

    moduleId: {
        type: db.Sequelize.INTEGER,
        references: {
            model: Module,
            key: 'id'
        },
       allowNull: false,
        onDelete: 'CASCADE'
    },
})

Module.hasMany(Lesson, { foreignKey: 'moduleId', as: 'lessons', onDelete: 'CASCADE' })
Lesson.belongsTo(Module, { foreignKey: 'moduleId', as: 'module' })

//Lesson.sync({alter:true})

module.exports = Lesson
