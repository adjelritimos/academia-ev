const jwt = require('jsonwebtoken')

module.exports = {

  gerarToken: (dados) => {
    const token = jwt.sign(dados, process.env.JWT_SECRET)
    return token
  },

  verificarToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
  }

}

