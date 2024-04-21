const Command = require('../../class/Command')
const getPokemonSelect = require('../../functions/getPokemonSelect')
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

        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        message.reply(`${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}** ${pokemon.options.isFavorite ? 'ya' : 'no'} es uno de tus pokémon favoritos, ¿quieres ${pokemon.options.isFavorite ? 'descartarlo' : 'añadirlo'} como favorito? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
            const collectorFilter = m => m.author.id === message.author.id
            const collector = message.channel.createMessageCollector({ filter: collectorFilter, time: 5000, max: 1 })

            collector.on('collect', async m => {
                let response = m.content.toLowerCase()

                if (['yes', 'sí', 'si', 'sim'].includes(response)) {
                    m.react('✅')

                    await axios.update({
                        url: 'serena/capture',
                        props: {
                            _id: pokemon._id,
                            set: { 'options.isFavorite': !pokemon.options.isFavorite },
                        },
                    })

                    return m.reply(`Acabas de ${!pokemon.options.isFavorite ? 'agregar' : 'retirar'} a ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}** ${!pokemon.options.isFavorite ? 'a' : 'de'} tu lista de favoritos.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})