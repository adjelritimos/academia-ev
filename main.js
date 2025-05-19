const express = require('express')
const app = express()
const port = 5349
const admin = require('./routes/admin')
const user = require('./routes/user')
const cors = require("cors")



// Middlewares
app.use(cors())
app.use(express.json())


// Rotas
app.use('/admin', admin)
app.use('/user', user)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
