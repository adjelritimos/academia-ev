const express = require('express')
const routes = express.Router()
const Email = require('./../emails/senderMail')
const User = require('../models/User')
const jwt = require('../configs/auth')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')
//const generateUserName = require('../functions/generateUserName')


routes.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await User.findOne({
            where: {
                username: {
                    [Op.eq]: username.trim()
                }
            }
        })

        if (user) {

            if (bcrypt.compareSync(password, user.password) && user.isAtive === 0) {
                
                const _user = {
                    username,
                    name: user.name,
                }

                const meuToken = jwt.gerarToken({ _user })

                res.status(200).json({ user: user, token: meuToken })

                user.isAtive = 1

                await user.save()
            }

            else
                res.status(401).json({ message: "username ou senha invalidos" })
        }
        else
            res.status(404).json({ message: 'username ou senha invalidos' })

    } catch (error) {

        console.log(error)
        
        res.status(400).json({ message: "Erro ao realizar login", error: error.message })
    }
})

routes.post('/register', async (req, res) => {
    try {
        const { name, password, email } = req.body
        const username = await generateUserName(name)
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        const user = await User.create({ name, username, email, password: passwordHash })
        if (user) {
            Email.enviarEmail({ email, name, username })
            res.status(200).json(user)
        }
        else
            res.status(400).json({ message: "Erro ao criar usuario" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Erro ao registar", error: error.message })
    }
})



module.exports = routes