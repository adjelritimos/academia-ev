const User = require("../models/user")

const generateUserName = async (name) => {
    let username = name.toLowerCase().replace(/\s+/g, '')
    try {
        
        const users = await User.findAll({
            attributes: ["username"]
        })

        const usernames = users.map(user => user.username)
        let attempt = 1
        let newUsername = username

        while (usernames.includes(newUsername)) {
            newUsername = `${username}${Math.floor(Math.random() * 1000)}`
            attempt++
            if (attempt > 1000) break
        }

        return newUsername

    } catch (error) {
        console.error("Erro ao gerar username:", error)
        return null
    }
}

module.exports = generateUserName
