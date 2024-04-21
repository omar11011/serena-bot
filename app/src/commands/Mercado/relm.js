const Command = require('../../class/Command')

const { axios } = require('../../services')

module.exports = new Command({
    name: "relmarket",
    description: "Elimina a uno de tus Pokémon del mercado.",
    cooldown: 6,
    alias: ['relm'],
    args: ['id'],
	async execute(message, props) {
        let data
        let id = props.args[0]

        data = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1&skip=${id}`,
        })).data.data

        if (data.length < 1) return message.react('🧐')
        else data = data[0]

        if (!data.options.onSale) return message.reply(`**${data.alias || data.name}** no se encuentra a la venta.`)

        message.reply(`¿Estás seguro de querer retirar a **${data.alias || data.name}** del mercado? Responde ` + '`sí` o `yes` para aceptar.').then(async msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react('✅')

                    data.options.onSale = false
                    data.options.marketPrice = null

                    await axios.update({
                        url: 'serena/capture',
                        props: {
                            _id: data._id,
                            set: { options: data.options },
                        },
                    })

                    return m.reply(`**${data.alias || data.name}** ya no está a la venta.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})