const Command = require('../../class/Command')
const { axios } = require('../../services')

module.exports = new Command({
    name: "release",
    description: "Libera algún Pokémon que hayas capturado.",
	async execute(message, props) {
        let id = props.args.length > 0 ? props.args[0] : null
        if (isNaN(id)) id = null
        else id = parseInt(id)

        let emoji = message.client.emoji
        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&${id ? 'skip=' + id : 'select=yes'}`,
        })).data

        if (data.length < 1) return message.reply(id ? 'El ID ingresado es inválido.' : 'No tienes ningún pokémon seleccionado.')
        else data = data[0]

        message.reply(`¿Estás segur@ de querer liberar a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}**? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react(emoji('check'))

                    await axios.update({
                        url: 'serena/capture',
                        props: {
                            _id: data._id,
                            set: {owner: null, options: {} },
                        },
                    })

                    return m.reply(`Acabas de liberar a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}** 😢`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})