const Command = require('../../class/Command')
const commands = require('./commands.json')
const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = () => {
    const COMMANDS = commands.map(e => {
        e.execute = async (message, props) => {
            let img = process.env.SITE_URL + (await axios.get({ url: `serena/gif/${e.name}` })).data
            let mention = message.mentions.users.first()
            let msgs = e.msgs[mention ? 'mention' : 'notMention']
            let description = msgs[Math.floor(Math.random() * msgs.length)]
            
            description = description.replace('BOT', `**${message.client.user.username}**`)
            description = description.replace('USER', `**${message.author.globalName}**`)
            if (mention) {
                description = description.replace('MENTION', `**${mention.globalName || mention.username}**`)
            }

            return createEmbed({
                message,
                data: {
                    description: img ? description : '¡Ups! Por el momento no cuento con gifs para esta categoría.',
                    image: img,
                },
            })
        }

        return new Command(e)
    })

    return COMMANDS
}