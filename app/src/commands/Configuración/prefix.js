const Command = require('../../class/Command')
const { axios } = require('../../services')
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

        if (newPrefix.length > 2) return message.reply(`El prefijo no puede tener más de dos caracteres.`)

        if (prefix === process.env.BOT_PREFIX && newPrefix !== process.env.BOT_PREFIX) {
            await db.establecer(message.guild.id, newPrefix)
        }
        else if (prefix !== process.env.BOT_PREFIX) {
            if (newPrefix === process.env.BOT_PREFIX) await db.eliminar(message.guild.id)
            else await db.establecer(message.guild.id, newPrefix)
        }

        await axios.update({
            url: 'serena/server',
            props: {
                server: message.guild.id,
                set: { 'config.prefix': newPrefix },
            },
        })

        return message.reply(`Mi nuevo prefijo en el servidor es **${newPrefix}**`)
	},
})