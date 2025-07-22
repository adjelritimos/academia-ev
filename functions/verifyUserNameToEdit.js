const User = require("../models/User")

const verifyUserNameToEdit = async (name) => {
    let username = name.toLowerCase().replace(/\s+/g, '')
    try {

        const users = await User.findAll({
            attributes: ["username"]
        })

        const usernames = users.map(user => user.username.trim())

        let count = 0

        for (let a = 0; count == 0 && a < usernames.length; a++) {
            console.log(usernames[a].trim(), username.trim(), usernames[a].trim() === username.trim())
            if(usernames[a].trim() === username.trim())
                count++
        }


        return count == 0

    } catch (error) {
        console.error("Erro:", error)
        return false
    }
}

module.exports = verifyUserNameToEdit
