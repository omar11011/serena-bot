const Command = require('../../class/Command')

const { axios } = require('../../services')
const createEmbed = require('../../utils/createEmbed')

module.exports = new Command({
    name: "marketbuy",
    alias: ["mbuy", "buym"],
    description: "Compra un Pokémon del mercado.",
    cooldown: 6,
    args: ['option', 'id'],
	async execute(message, props) {
        let data
        let emoji = message.client.emoji
        let option = props.args[0].toLowerCase()
        let id = props.args[1]

        if (!['p', 'i'].includes(option)) return message.reply('Opción inválida.')

        if (option === 'p') {
            data = (await axios.get({
                url: `serena/capture?code=${id}&limit=1`,
            })).data.data
        }

        if (data.length < 1) return message.react('🧐')
        else data = data[0]

        if (!data.options.onSale) return message.reply(`**${data.alias || data.name}** no se encuentra a la venta.`)
        if (data.owner === message.author.id) return message.reply(`No puedes comprar a **${data.alias || data.name}** porque es de tu propiedad.`)

        let user = (await axios.create({
            url: 'serena/user',
            props: { user: message.author.id },
        })).data

        if (data.options.marketPrice > user.balance.money) return message.reply(`No tienes fondos suficiente para esta compra.`)

        message.reply(`¿Estás seguro de querer comprar a **${data.alias || data.name}** por **$${data.options.marketPrice}**? Responde ` + '`sí` o `yes` para aceptar.').then(async msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react(emoji('check'))

                    await axios.update({
                        url: 'serena/user',
                        props: {
                            user: message.author.id,
                            inc: { 'balance.money': -data.options.marketPrice },
                        },
                    })
            
                    if (data.owner) {
                        await axios.update({
                            url: 'serena/user',
                            props: {
                                user: data.owner,
                                inc: { 'balance.money': data.options.marketPrice },
                            },
                        })
                    }
            
                    await axios.update({
                        url: 'serena/' + (option === 'p' ? 'capture' : 'item'),
                        props: {
                            _id: data._id,
                            set: {
                                owner: message.author.id,
                                options: {},
                            },
                        },
                    })
            
                    return message.reply(`¡Felicidades! Ahora **${data.alias || data.name}** es de tu propiedad.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})