const express = require('express')
const routes = express.Router()
const Module = require('../models/modules')
const Lesson = require('../models/lessons')
const Lemma = require('../models/lemmas')
const Command = require('../models/commands')
const Question = require('../models/questions')
const Answer = require('../models/answers')
const User = require('../models/User')
const Classe = require('../models/classes')
const Attendance = require('../models/presencas')


routes.get('/get/all/data/to/sync', async (req, res) => {

    try {

        const modules = await Module.findAll()

        const lessons = await Lesson.findAll()

        const lemmas = await Lemma.findAll()

        const commands = await Command.findAll()

        const questions = await Question.findAll()

        const answers = await Answer.findAll()

        const data = { modules, lessons, lemmas, commands, questions, answers }

        res.status(200).json(data)

    } catch (error) {

        console.log(error)

        res.status(500).json({ message: error.message })

    }
})

routes.post('/create/my/precence/:userId', async (req, res) => {

    const { userId } = req.params

    try {
        // Verifica se o usuário existe
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        // Converter datahora para início e fim do dia
        const inputDate = new Date()
        const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0))
        const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999))

        // Verifica se há alguma aula nesse dia
        const classe = await Classe.findOne({
            where: {
                data: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        })

        if (!classe) {
            return res.status(404).json({ error: 'Nenhuma aula encontrada para essa data' })
        }

        // Cria a presença
        const attendance = await Attendance.create({ userId, classId: classe.id, datahora })

        res.status(201).json({ message: 'Presença registrada com sucesso', attendance })

    } catch (error) {
        console.error('Erro ao registrar presença:', error)
        res.status(500).json({ error: 'Erro interno do servidor' })
    }
})


module.exports = routes