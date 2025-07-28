const Classe = require('./classes')
const db = require('./db')
const User = require('./User')

const Attendance = db.sequelize.define('attendances', {
    classId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Classe, // nome da tabela
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    userId: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    datahora: {
        type: db.Sequelize.DATE,
        allowNull: false,
    }
})

// Associações com alias
Classe.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances', onDelete: 'CASCADE' })
Attendance.belongsTo(Classe, { foreignKey: 'classId', as: 'classe' })

User.hasMany(Attendance, { foreignKey: 'userId', as: 'attendances', onDelete: 'CASCADE' })
Attendance.belongsTo(User, { foreignKey: 'userId', as: 'user' })

//Attendance.sync({force:true})

module.exports = Attendance
