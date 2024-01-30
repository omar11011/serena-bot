const { Events } = require('discord.js')
const { megadb, colors, axios } = require('../services')
const { nekotina } = require('../bots')

const checkCommandOptions = require('../utils/checkCommandOptions')

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
        const props = {
            prefix: await megadb.getPrefix(message.guildId),
            language: {
                user: "es",
                server: "es",
            },
        }
        
        if (message.author.bot) {
            if (message.author.id === nekotina.getNekoId()) {
                if (message.embeds.length > 0) {
                    if (!message.reference) await nekotina.saveGifs(message.embeds)
                    else await nekotina.saveCharacters(message)
                }
            }
            return
        }
        
        if (!message.content.startsWith(props.prefix)) {
            // Experiencia por escribir
            if (message.content.length > 5) {
                const prob = Math.ceil(Math.random() * 100)
                if (prob <= 10) await axios.addUserExp(message, Math.ceil(Math.random() * 3))
            }

            return
        }

        props.args = message.content.slice(props.prefix.length).split(/ +/)

        const nameCommand = props.args.shift().toLowerCase()
        const command = message.client.commands.find(e => e.data.name === nameCommand || e.data.alias.includes(nameCommand))
        if (!command) return

        const checkOptions = await checkCommandOptions(message, command.data, props)
        if (checkOptions.error) return message.reply(checkOptions.msg)
        
        try {
            await command.execute(message, props)
        } catch(err) {
            return colors.logMsg(err.message, 'r')
        }
	},
}