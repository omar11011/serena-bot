const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const { axios } = require('../../services')

module.exports = new Command({
    name: 'removespawn',
    userPermissions: ['Administrator'],
    description: "Elimina uno de los canales de spawn del servidor.",
	async execute(message, props) {
        const emoji = message.client.emoji
        const embed = { color: 'red' }
        const channels = (await axios.create({
            url: 'serena/server',
            props: { server: message.guild.id },
        })).data.spawn

        if (!channels.map(e => e.channel).includes(message.channel.id)) embed.description = `${emoji("error")} Este canal no era un spawn de Pokémon.`
        else {
            await axios.update({
                url: 'serena/server',
                props: {
                    server: message.guild.id,
                    set: { spawn: channels.filter(e => e.channel != message.channel.id) },
                },
            })

            embed.color = 'green'
            embed.description = `${emoji("check")} Este canal ya no forma parte de los spawns del servidor.`
        }

        return createEmbed({
            message,
            data: embed,
        })
	},
})