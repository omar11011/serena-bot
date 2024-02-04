const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const megadb = require('megadb')
const db = new megadb.crearDB('spawn', 'server')

module.exports = new Command({
    name: 'setspawn',
    userPermissions: ['Administrator'],
    description: "Establece un canal como spawn para atrapar Pokémon salvajes.",
	async execute(message, props) {
        const emoji = message.client.emoji
        const channels = await db.obtener(message.guild.id) || []
        const embed = { color: 'red' }

        if (channels.includes(message.channel.id)) embed.description = `${emoji("error")} Este canal ya forma parte de los spawn del servidor.`
        else {
            if (channels.length >= 2) embed.description = `${emoji("error")} El servidor ya alcanzó el límite de canales de spawn.`
            else {
                channels.push(message.channel.id)

                embed.color = 'green'
                embed.description = `${emoji("check")} Has añadido este canal como spawn para el servidor.`

                await db.establecer(message.guild.id, channels)
            }
        }

        return createEmbed({
            message,
            data: embed,
        })
	},
})