const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const { axios } = require('../../services')

module.exports = new Command({
    name: 'removespawn',
    userPermissions: ['Administrator'],
    description: "Elimina uno de los canales de spawn del servidor.",
	async execute(message, props) {
        const channels = (await axios.create({
            url: 'serena/server',
            props: { server: message.guild.id },
        })).data.spawn
        const channelIsSpawn = channels.map(e => e.channel).includes(message.channel.id)

        if (channelIsSpawn) {
            await axios.update({
                url: 'serena/server',
                props: {
                    server: message.guild.id,
                    set: { spawn: channels.filter(e => e.channel != message.channel.id) },
                },
            })
        }

        return createEmbed({
            message,
            data: {
                color: channelIsSpawn ? 'green' : 'red',
                description:
                    channelIsSpawn
                    ? `✅ Este canal ya no forma parte de los spawns del servidor.`
                    : `❌ Este canal no era un spawn de Pokémon.`,
            },
        })
	},
})