const express = require('express')
const bcrypt = require('bcryptjs')
const Email = require('./../emails/senderMail')
const routes = express.Router()
const Module = require('../models/modules')
const Lesson = require('../models/lessons')
const Lemma = require('../models/lemmas')
const Command = require('../models/commands')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Question = require('../models/questions')
const Answer = require('../models/answers')
const Classe = require('../models/classes')
const generateUserName = require('../functions/generateUserName')
const User = require('../models/user')
const gerarPassword = require('../functions/gerarPasswords')

const UPLOADS_DIR = path.join(__dirname, 'uploads')

routes.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Garantir que a pasta uploads exista
const uploadDir = path.join(__dirname, 'uploads')

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
        cb(null, filename)
    }
})

const upload = multer({ storage })

//--------------------- USERS --------------------------
routes.post('/registe/a/user', async (req, res) => {

    try {

        const { nbi, name, school, contact, brithDate, isBatizado, batData, email, churchName, guardianName } = req.body

        const username = await generateUserName(name)

        const salt = bcrypt.genSaltSync(10)

        const password = gerarPassword(8)

        const passwordHash = bcrypt.hashSync(password, salt)

        const user = await User.create({ nbi, name, username, password: passwordHash, school, churchName, guardianName, contact, brithDate, isBatizado, batData })

        if (user) {

            Email.enviarEmail({ email, name, username, password })

            res.status(200).json(user)

        } else {

            res.status(400).json({ message: "Erro ao criar usuário" })

        }
    } catch (error) {

        console.log(error)

        res.status(400).json({ message: "Erro ao registrar", error: error.message })
    }
})

// LISTAR TODOS
routes.get('/get/all/users', async (req, res) => {

    try {

        const users = await User.findAll()

        res.status(200).json(users)

    } catch (error) {

        console.log(error)

        res.status(400).json({ message: "Erro ao listar usuários", error: error.message })

    }
})

// EDITAR
routes.put('/edit/a/users/:id', async (req, res) => {

    try {

        const { id } = req.params

        const { nbi, name, school, contact, brithDate, isBatizado, batData, churchName, guardianName, isAtive } = req.body

        const user = await User.findByPk(id)

        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

        user.nbi = nbi || user.nbi
        user.name = name || user.name
        user.school = school || user.school
        user.contact = contact || user.contact
        user.brithDate = brithDate || user.brithDate
        user.isBatizado = isBatizado || user.isBatizado
        user.batData = batData || user.batData
        user.churchName = churchName || user.churchName
        user.guardianName = guardianName || user.guardianName
        user.isAtive = isAtive !== undefined ? isAtive : user.isAtive

        await user.save()

        res.status(200).json(user)

    } catch (error) {

        console.log(error)

        res.status(400).json({ message: "Erro ao editar usuário", error: error.message })
    }
})

// REMOVER
routes.delete('/delete/a/users/:id', async (req, res) => {

    try {

        const { id } = req.params

        const user = await User.findByPk(id)

        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })

        await user.destroy()

        res.status(200).json({ message: "Usuário removido com sucesso" })

    } catch (error) {

        console.log(error)

        res.status(400).json({ message: "Erro ao remover usuário", error: error.message })
    }
})


//-------------------- module ---------------------------------------

routes.get('/get/all/modules', async (req, res) => {
    try {
        const modules = await Module.findAll({
            attributes: ['id', 'name'],
        })

        res.status(200).json(modules)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.post('/add/a/module', async (req, res) => {
    try {

        const { name } = req.body

        const module = await Module.create({ name })

        res.status(200).json({ success: 'new module created' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

routes.put('/edit/a/module/:moduleId', async (req, res) => {
    try {

        const { name } = req.body

        const [edited_module] = await Module.update({ name }, { where: { id: req.params.moduleId } })

        if (edited_module)
            res.status(200).json({ success: 'module edited' })
        else
            res.status(400).json({ error: 'Algo correu mal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

routes.delete('/delete/a/module/:moduleId', async (req, res) => {
    try {

        const deleted_module = await Module.destroy({ where: { id: req.params.moduleId } })

        if (deleted_module) {
            res.status(200).json({ message: "module was deleted!" })
        } else {
            res.status(404).json({ message: "module not found" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao atualizar nome" })
    }
})

//-------------------------------- Classes ----------------------------------

// GET all classes
routes.get('/get/all/classes', async (req, res) => {
    try {
        const classes = await Classe.findAll({
            attributes: ['id', 'title', 'tytpes', 'data'],
        })

        res.status(200).json(classes)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// POST add a class
routes.post('/add/a/class', async (req, res) => {
    try {
        const { title, tytpes, data } = req.body

        const newClass = await Classe.create({ title, tytpes, data })

        res.status(200).json({ success: 'new class created' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// PUT edit a class
routes.put('/edit/a/class/:classId', async (req, res) => {
    try {
        const { title, tytpes, data } = req.body

        const [editedClass] = await Classe.update(
            { title, tytpes, data },
            { where: { id: req.params.classId } }
        )

        if (editedClass)
            res.status(200).json({ success: 'class edited' })
        else
            res.status(400).json({ error: 'Algo correu mal' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

// DELETE a class
routes.delete('/delete/a/class/:classId', async (req, res) => {
    try {
        const deletedClass = await Classe.destroy({
            where: { id: req.params.classId }
        })

        if (deletedClass) {
            res.status(200).json({ message: "class was deleted!" })
        } else {
            res.status(404).json({ message: "class not found" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao apagar a class" })
    }
})



//-------------------------------- LESSONS -----------------------------------

routes.get('/get/all/lessons/of/module/:moduleId', async (req, res) => {
    const { moduleId } = req.params

    try {
        const module = await Module.findByPk(moduleId, {
            include: {
                model: Lesson,
                as: 'lessons'
            }
        })

        if (!module) {
            res.status(404).json({ message: "Módulo não encontrado." })
        }

        res.status(200).json(module.lessons)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro interno no servidor." })
    }
})

routes.post('/add/a/lesson', async (req, res) => {
    try {

        const { content, body, moduleId } = req.body

        const lesson = await Lesson.create({ content, body, moduleId })

        res.status(200).json(lesson)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

routes.put('/edit/a/lesson/:lessonId', async (req, res) => {
    try {

        const { content, body } = req.body

        const [edited_lesson] = await Lesson.update({ content, body }, { where: { id: req.params.lessonId } })

        if (edited_lesson) {
            const lesson_edited = await Lesson.findByPk(req.params.lessonId)
            res.status(200).json(lesson_edited)
        }

        else
            res.status(400).json({ error: 'Algo correu mal' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

routes.delete('/delete/a/lesson/:lessonId', async (req, res) => {
    try {

        const deleted_lesson = await Lesson.destroy({ where: { id: req.params.lessonId } })

        if (deleted_lesson) {
            res.status(200).json({ message: "lesson was deleted!" })
        } else {
            res.status(404).json({ message: "lesson not found" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao atualizar nome" })
    }
})



//--------------------------------- LEMMAS ----------------------------
routes.get('/get/all/lemmas', async (req, res) => {
    try {
        const lemmas = await Lemma.findAll()

        res.status(200).json(lemmas)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.post('/add/a/lemma', upload.single('sound'), async (req, res) => {
    try {

        const { question, answer } = req.body

        const sound = req.file ? `/uploads/${req.file.filename}` : null

        const lemma = await Lemma.create({ question, answer, sound })

        res.status(200).json(lemma)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

routes.put('/edit/a/lemma/:lemmaId', upload.single('sound'), async (req, res) => {
    try {
        const lemma = await Lemma.findByPk(req.params.lemmaId)

        if (!lemma) {
            return res.status(404).json({ message: "Lemma não encontrado." })
        }

        const { question, answer, sound } = req.body

        let newSoundPath = lemma.sound // valor padrão: mantém o mesmo som

        // Caso 1: Usuário quer remover o som ('null' como string)
        if (sound === 'null') {
            newSoundPath = null
        }

        // Caso 2: Upload de novo som
        if (req.file) {
            newSoundPath = `/uploads/${req.file.filename}`
        }

        // Se houve mudança de som e existe um som anterior
        if (newSoundPath !== lemma.sound && lemma.sound) {
            const oldSoundPath = path.join(UPLOADS_DIR, path.basename(lemma.sound))
            if (fs.existsSync(oldSoundPath)) {
                fs.unlinkSync(oldSoundPath)
            }
        }

        // Atualiza o registro
        const [updatedRows] = await Lemma.update({ question, answer, sound: newSoundPath }, { where: { id: req.params.lemmaId } })

        if (updatedRows === 0) {
            return res.status(400).json({ error: 'Algo correu mal.' })
        }

        const updatedLemma = await Lemma.findByPk(req.params.lemmaId)
        return res.status(200).json(updatedLemma)

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
})

routes.delete('/delete/a/lemma/:lemmaId', async (req, res) => {
    try {

        const lemma = await Lemma.findByPk(req.params.lemmaId)

        if (!lemma) {
            res.status(404).json({ message: "lemma não encontrado." })
        }

        const soundPath = lemma.sound

        if (soundPath) {

            const fullImagePath = path.join(UPLOADS_DIR, path.basename(soundPath))

            if (fs.existsSync(fullImagePath)) {
                fs.unlinkSync(fullImagePath)
            }

        }
        const deleted_lemma = await lemma.destroy()

        if (deleted_lemma) {
            res.status(200).json({ message: "A lemma was deleted!" })
        } else {
            res.status(404).json({ message: "lemma not found" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao atualizar nome" })
    }
})



//=================================== COMMANDS =================================
routes.get('/get/all/commands', async (req, res) => {
    try {
        const commands = await Command.findAll()

        res.status(200).json(commands)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.post('/add/a/command', upload.fields([{ name: 'demonstration', maxCount: 1 }, { name: 'sound', maxCount: 1 }]), async (req, res) => {

    try {

        const { name, description } = req.body

        const demonstration = req.files.demonstration ? `/uploads/${req.files.demonstration[0].filename}` : null
        const sound = req.files.sound ? `/uploads/${req.files.sound[0].filename}` : null

        const command = await Command.create({ name, description, demonstration, sound })

        res.status(200).json(command)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }

})

routes.put('/edit/a/command/:commandId', upload.fields([{ name: 'demonstration', maxCount: 1 }, { name: 'sound', maxCount: 1 }]), async (req, res) => {

    try {
        const command = await Command.findByPk(req.params.commandId)

        if (!command) {
            return res.status(404).json({ message: 'Comando não encontrado.' })
        }

        const { name, description, demonstration, sound } = req.body

        let newDemonstration = command.demonstration
        let newSound = command.sound

        if (demonstration === 'null') {
            newDemonstration = null
        } else if (req.files.demonstration) {
            newDemonstration = `/uploads/${req.files.demonstration[0].filename}`
        }

        if (sound === 'null') {
            newSound = null
        } else if (req.files.sound) {
            newSound = `/uploads/${req.files.sound[0].filename}`
        }

        if ((demonstration === 'null' || req.files.demonstration) && command.demonstration) {
            const oldImagePath = path.join(UPLOADS_DIR, path.basename(command.demonstration))
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath)
            }
        }

        if ((sound === 'null' || req.files.sound) && command.sound) {
            const oldSoundPath = path.join(UPLOADS_DIR, path.basename(command.sound))
            if (fs.existsSync(oldSoundPath)) {
                fs.unlinkSync(oldSoundPath)
            }
        }

        const [updatedRows] = await Command.update({ name, description, demonstration: newDemonstration, sound: newSound }, { where: { id: req.params.commandId } })

        if (updatedRows === 0) {
            return res.status(400).json({ error: 'Falha ao atualizar o comando.' })
        }

        const updatedCommand = await Command.findByPk(req.params.commandId)
        return res.status(200).json(updatedCommand)

    } catch (err) {
        console.error(err.message)
        return res.status(500).json({ message: err.message })
    }
}
)

routes.delete('/delete/a/command/:commandId', async (req, res) => {

    const { commandId } = req.params

    try {

        const command = await Command.findByPk(commandId)

        if (!command) {
            res.status(404).json({ message: "Comando não encontrado." })
        }

        const imagePath = command.demonstration

        if (imagePath) {

            const fullImagePath = path.join(UPLOADS_DIR, path.basename(imagePath))

            if (fs.existsSync(fullImagePath)) {
                fs.unlinkSync(fullImagePath)
            }

        }


        const soundPath = command.sound

        if (soundPath) {

            const fullSoundPath = path.join(UPLOADS_DIR, path.basename(soundPath))

            if (fs.existsSync(fullSoundPath)) {
                fs.unlinkSync(fullSoundPath)
            }

        }



        await command.destroy()

        res.status(200).json({ message: "Comando e imagem excluídos com sucesso!" })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao excluir comando." })
    }
})



//------------------------ PERGUNTAS LEMAS, COMANDOS, CONTEÚDOS ------------------------------------

routes.get('/get/all/question/group/lemmas', async (req, res) => {
    try {
        const lemmas = await Lemma.findAll({
            attributes: ['id', 'question'],
            include: [
                {
                    model: Question,
                    as: 'questions',
                    attributes: ['id', 'question', 'correct_answer', 'lemmaId'],
                    include: [
                        {
                            model: Answer,
                            as: 'answers',
                            attributes: ['id', 'answer']
                        }
                    ]
                }
            ]
        })

        res.status(200).json(lemmas)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', error: err.message })
    }
})

routes.get('/get/all/question/group/commands', async (req, res) => {
    try {
        const commands = await Command.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: Question,
                    as: 'questions',
                    attributes: ['id', 'question', 'correct_answer', 'commandId'],
                    include: [
                        {
                            model: Answer,
                            as: 'answers',
                            attributes: ['id', 'answer']
                        }
                    ]
                }
            ]
        })

        res.status(200).json(commands)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', error: err.message })
    }
})

routes.get('/get/all/question/group/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.findAll({
            attributes: ['id', 'content'],
            include: [
                {
                    model: Question,
                    as: 'questions',
                    attributes: ['id', 'question', 'correct_answer', 'lessonId'],
                    include: [
                        {
                            model: Answer,
                            as: 'answers',
                            attributes: ['id', 'answer']
                        }
                    ]
                }
            ]
        })

        res.status(200).json(lessons)

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error', error: err.message })
    }
})

routes.post('/add/a/lemma/question', async (req, res) => {

    try {

        const { question, correct_answer, lemmaId, options } = req.body

        const new_question = await Question.create({ question, correct_answer, lessonId: null, commandId: null, lemmaId })

        if (new_question) {

            for await (const answer of options) {
                await Answer.create({ answer, questionId: new_question.id })
            }

            const question = await Question.findByPk(new_question.id, {
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                        attributes: ['id', 'answer']
                    }
                ]
            })

            res.status(200).json(question)

        } else {

            res.status(400).json({ error: 'ocorreu um erro ao criar a pergunta' })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.post('/add/a/command/question', async (req, res) => {

    try {

        const { question, correct_answer, commandId, options } = req.body

        const new_question = await Question.create({ question, correct_answer, lessonId: null, commandId, lemmaId: null })

        if (new_question) {

            for await (const answer of options) {

                await Answer.create({ answer, questionId: new_question.id })

            }
            const question = await Question.findByPk(new_question.id, {
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                        attributes: ['id', 'answer']
                    }
                ]
            })

            res.status(200).json(question)
        } else {

            res.status(400).json({ error: 'ocorreu um erro ao criar a pergunta' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.post('/add/a/lesson/question', async (req, res) => {

    try {

        const { question, correct_answer, lessonId, options } = req.body

        const new_question = await Question.create({ question, correct_answer, lessonId, command: null, lemmaId: null })

        if (new_question) {

            for await (const answer of options) {

                await Answer.create({ answer, questionId: new_question.id })

            }

            const question = await Question.findByPk(new_question.id, {
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                        attributes: ['id', 'answer']
                    }
                ]
            })

            res.status(200).json(question)
        } else {

            res.status(400).json({ error: 'ocorreu um erro ao criar a pergunta' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.put('/edit/a/question/:questionId', async (req, res) => {

    try {

        const { question, correct_answer, options } = req.body

        const [update_question] = await Question.update({ question, correct_answer }, { where: { id: req.params.questionId } })

        if (update_question) {

            for await (const answer of options) {

                console.log(answer)

                if (answer.isRemove)
                    await Answer.destroy({ where: { id: answer.id } })

                if (!answer.id)
                    await Answer.create({ answer: answer.answer, questionId: req.params.questionId })

                else
                    await Answer.update({ answer: answer.answer }, { where: { id: answer.id } })
            }

            const edited_question = await Question.findByPk(req.params.questionId, {
                include: [
                    {
                        model: Answer,
                        as: 'answers',
                        attributes: ['id', 'answer']
                    }
                ]
            })

            res.status(200).json(edited_question)
        } else {

            res.status(400).json({ error: 'ocorreu um erro ao atualizar a pergunta' })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
})

routes.delete('/delete/a/question/:questionId', async (req, res) => {

    try {

        const delete_question = await Question.destroy({ where: { id: req.params.questionId } })

        if (delete_question) {
            res.status(200).json({ message: "question was deleted!" })
        } else {
            res.status(404).json({ message: "question not found" })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao atualizar nome" })
    }


})

module.exports = routes