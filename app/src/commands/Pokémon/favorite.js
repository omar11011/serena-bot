const Command = require('../../class/Command')
const { axios } = require('../../services')

module.exports = new Command({
    name: "favorite",
    alias: ['fav', 'favo'],
    description: "Agrega o retira un Pokémon de tu lista de favoritos.",
    cooldown: 4,
	async execute(message, props) {
        let id = props.args.length > 0 ? props.args[0] : null
        if (isNaN(id)) id = null
        else id = parseInt(id)

        let { data } = (await axios.get({
            url: `serena/capture?owner=${message.author.id}&limit=1${id ? 'skip=' + id : 'select=yes'}`,
        })).data

        if (data.length < 1) return message.reply(id ? 'El ID ingresado es inválido.' : 'No tienes ningún pokémon seleccionado.')
        else data = data[0]

        message.reply(`${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}** ${data.options.isFavorite ? 'ya' : 'no'} es uno de tus pokémon favoritos, ¿quieres ${data.options.isFavorite ? 'descartarlo' : 'añadirlo'} como favorito? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react('✅')

                    await axios.update({
                        url: 'serena/capture',
                        props: {
                            _id: data._id,
                            set: { 'options.isFavorite': !data.options.isFavorite },
                        },
                    })

                    return m.reply(`Acabas de ${!data.options.isFavorite ? 'agregar' : 'retirar'} a ${data.shiny ? '⭐ ' : ''}**${data.alias || data.name}** ${!data.options.isFavorite ? 'a' : 'de'} tu lista de favoritos.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})