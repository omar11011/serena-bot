const update = require('./update')
const logMsg = require('../colors/logMsg')

module.exports = async (message, exp, user) => {

    const result = (await update({
        url: 'user-exp',
        props: {
            user: user ? user : message.author.id,
            exp: exp,
        },
    })).data
    
    if (result.error) return logMsg(result.error, 'r')
    if (result.up) return message.reply(`¡Felicidades! Has alcanzado el nivel *${result.level}*.`)

}