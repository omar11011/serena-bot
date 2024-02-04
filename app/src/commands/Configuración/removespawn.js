const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')

const megadb = require('megadb')
const db = new megadb.crearDB('spawn', 'server')

module.exports = new Command({
    name: 'removespawn',
    userPermissions: ['Administrator'],
    description: "Elimina uno de los canales de spawn del servidor.",
	async execute(message, props) {
        const emoji = message.client.emoji
        const channels = await db.obtener(message.guild.id) || []
        const embed = { color: 'red' }

        if (!channels.includes(message.channel.id)) embed.description = `${emoji("error")} Este canal no era un spawn de Pokémon.`
        else {
            await db.extract(message.guild.id, message.channel.id)

            embed.color = 'green'
            embed.description = `${emoji("check")} Este canal ya no forma parte de los spawns del servidor.`
        }

        return createEmbed({
            message,
            data: embed,
        })
	},
})