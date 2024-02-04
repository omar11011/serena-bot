const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const megadb = require('megadb')
const db = new megadb.crearDB('prefix', 'server')

module.exports = new Command({
    name: 'prefix',
    alias: ['prefijo'],
    userPermissions: ['Administrator'],
    description: "Cambia mi prefijo en el servidor.",
    args: ['prefix'],
	async execute(message, props) {
        let prefix = props.prefix
        let newPrefix = props.args[0].toLowerCase()
        let emoji = message.client.emoji
        let data = {
            color: 'darkRed',
            description: `${emoji("error")} El prefijo no puede tener más de dos caracteres.`,
        }

        if (newPrefix.length <= 2) {
            data.color = 'darkGreen'
            data.description = `${emoji("check")} Mi nuevo prefijo en el servidor es **${newPrefix}**`

            if (prefix === process.env.BOT_PREFIX && newPrefix !== process.env.BOT_PREFIX) {
                await db.establecer(message.guild.id, newPrefix)
            }
            else if (prefix !== process.env.BOT_PREFIX) {
                if (newPrefix === process.env.BOT_PREFIX) await db.eliminar(message.guild.id)
                else await db.establecer(message.guild.id, newPrefix)
            }
        }

        return createEmbed({ message, data })
	},
})