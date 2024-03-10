const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const { axios } = require('../../services')

module.exports = new Command({
    name: 'setspawn',
    userPermissions: ['Administrator'],
    description: "Establece un canal como spawn para atrapar Pokémon salvajes.",
    cooldown: 4,
	async execute(message, props) {
        let emoji = message.client.emoji
        let embed = { color: 'red' }
        let server = (await axios.create({
            url: 'server',
            props: { server: message.guild.id },
        })).data

        if (server.spawn.find(e => e.channel == message.channel.id)) {
            embed.description = `${emoji("error")} Este canal ya forma parte de los spawn del servidor.`
        }
        else {
            if (server.spawn.length >= 2) embed.description = `${emoji("error")} El servidor ya alcanzó el límite de canales de spawn.`
            else {
                embed.color = 'green'
                embed.description = `${emoji("check")} Has añadido este canal como spawn para el servidor.`

                server.spawn.push({ channel: message.channel.id })
                
                await axios.update({
                    url: 'server',
                    props: {
                        server: message.guild.id,
                        set: {
                            spawn: server.spawn,
                        },
                    },
                })
            }
        }

        return createEmbed({
            message,
            data: embed,
        })
	},
})