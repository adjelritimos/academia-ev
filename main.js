const express = require('express')
const app = express()
const PORT = 5349
const admin = require('./routes/admin')
const user = require('./routes/user')
const cors = require("cors")
let qrword = { word: '', date: null }



// Middlewares
app.use(cors())
app.use(express.json())


// Rotas
app.use('/admin', admin)
app.use('/user', user)

app.post('/save/a/word/and/date/for/qrcode', (req, res) => {

  try {
    const { word, date } = req.body
    qrword = { word, date }
    res.status(200).json({ message: 'Word and date saved successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Error saving word and date' })
  }
})

app.get('/check/word', (req, res) => {
  try {
    res.status(200).json(qrword.word)
  } catch (error) {
    res.status(500).json({ message: 'Error getting word' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
