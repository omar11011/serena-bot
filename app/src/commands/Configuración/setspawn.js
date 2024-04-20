const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const { axios } = require('../../services')

module.exports = new Command({
    name: 'setspawn',
    userPermissions: ['Administrator'],
    description: "Establece un canal como spawn para atrapar Pokémon salvajes.",
    cooldown: 4,
	async execute(message, props) {
        let server = (await axios.create({
            url: 'serena/server',
            props: { server: message.guild.id },
        })).data

        let itIsSpawn = server.spawn.find(e => e.channel == message.channel.id)
        let canBeAdded = server.spawn.length < 2

        if (!itIsSpawn && canBeAdded) {
            server.spawn.push({ channel: message.channel.id })

            await axios.update({
                url: 'serena/server',
                props: {
                    server: message.guild.id,
                    set: {
                        spawn: server.spawn,
                    },
                },
            })
        }

        return createEmbed({
            message,
            data: {
                color: itIsSpawn || !canBeAdded ? 'red' : 'green',
                description: 
                    itIsSpawn
                    ? `❌ Este canal ya forma parte de los spawn del servidor.`
                    : canBeAdded
                        ? `✅ Has añadido este canal como spawn para el servidor.`
                        : `❌ El servidor ya alcanzó el límite de canales de spawn.`,
            },
        })
	},
})