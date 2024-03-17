const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "addmarket",
    description: "Agrega uno de tus Pokémon al mercado.",
    cooldown: 6,
    alias: ['addm'],
    args: ['option', 'id', 'precio'],
	async execute(message, props) {
        let data
        let emoji = message.client.emoji
        let option = props.args[0].toLowerCase()
        let id = props.args[1]
        let price = props.args[2]

        if (!['p', 'i'].includes(option)) return message.reply('Opción no válida.')
        if (isNaN(price) || parseInt(price) < 1) return message.reply('El precio no es válido.')

        if (option == 'p') {
            if (isNaN(id) || parseInt(id) < 1) return message.reply('El ID no es válido.')

            data = (await axios.get({
                url: `serena/capture?owner=${message.author.id}&limit=1&skip=${id}`,
            })).data.data
        }

        if (data.length < 1) return message.react('🧐')
        else data = data[0]

        if (data.options.onSale) return message.reply(`**${data.alias || data.name}** ya estaba agregado al mercado por un valor de **$${data.options.marketPrice}**.`)

        message.reply(`¿Estás seguro de querer agregar a **${data.alias || data.name}** al mercado por **$${price}**? Responde ` + '`sí` o `yes` para aceptar.').then(async msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react(emoji('check'))

                    data.options.onSale = true
                    data.options.marketPrice = parseInt(price)

                    await axios.update({
                        url: 'serena/' + (option === 'p' ? 'capture' : 'item'),
                        props: {
                            _id: data._id,
                            set: { options: data.options },
                        },
                    })

                    return m.reply(`Has puesto en venta a **${data.alias || data.name}** por un valor de **$${price}**.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})