const Command = require('../../class/Command')

const { axios } = require('../../services')

module.exports = new Command({
    name: "release",
    description: "Libera algún Pokémon que hayas capturado.",
    args: ['id'],
	async execute(message, props) {
        let id = props.args[0]
        let emoji = message.client.emoji
        if (isNaN(id) || parseInt(id) < 1) return message.react('❌')

        let data = (await axios.get({ url: `captures/${message.author.id}?skip=${parseInt(id) - 1}` })).data
        if (Array.isArray(data) && data.length < 1) return message.react('🧐')

        message.reply(`¿Estás seguro de querer liberar a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}**? Responde ` + '`yes` par aceptar.')

        const collectorFilter = m => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 10000, max: 1 })

        collector.on('collect', async m => {
            if (m.content.toLowerCase() === 'yes') {
                await axios.update({
                    url: `capture`,
                    props: {
                        id: data.id,
                        user: null,
                        select: false,
                        favorite: false,
                        marketPrice: null,
                    },
                })

                return m.reply(`Has liberado a ${data.shiny ? '⭐ ' : ''}**${data.pokemon.alias || data.pokemon.name}** 😦`)
            }
            m.react(emoji('check'))
        })

        collector.on('end', () => message.react('⌛'))
	},
})