const Command = require('../../class/Command')
const createEmbed = require('../../utils/createEmbed')
const { axios } = require('../../services')

module.exports = new Command({
    name: 'spawn',
    userPermissions: ['Administrator'],
    description: "Mira los canales en los que spawnearán Pokémon salvajes.",
	async execute(message, props) {
        const channels = (await axios.create({
            url: 'serena/server',
            props: { server: message.guild.id },
        })).data.spawn

        return createEmbed({
            message,
            data: {
                color: 'green',
                description: channels.length < 1 ? `Aún no se han establecido canales de spawn en el servidor.` : `Los Pokémon salvajes aparecerán en los siguientes canales:`,
                fields: channels.map((e, i) => {
                    return { name: `Spawn ${i + 1}`, value: `<#${e.channel}>`, inline: true }
                }),
                footer: `Puedes añadir canales usando el comando ${props.prefix}setspawn`,
            },
        })
	},
})