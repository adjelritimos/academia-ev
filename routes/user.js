const express = require('express')
const routes = express.Router()
const { Op, where, Model } = require('sequelize')
const Module = require('../models/modules')
const Lesson = require('../models/lessons')
const Lemma = require('../models/lemmas')
const Command = require('../models/commands')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Question = require('../models/questions')
const Answer = require('../models/answers')


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

module.exports = routes