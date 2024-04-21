const Command = require('../../class/Command')
const getPokemonSelect = require('../../functions/getPokemonSelect')
const { axios } = require('../../services')

module.exports = new Command({
    name: "release",
    description: "Libera algún Pokémon que hayas capturado.",
	async execute(message, props) {
        let id = props.args.length > 0 ? props.args[0] : null
        if (isNaN(id)) id = null
        else id = parseInt(id)

        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        message.reply(`¿Estás segur@ de querer liberar a ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}**? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
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
                            set: {owner: null, options: {} },
                        },
                    })

                    return m.reply(`Acabas de liberar a ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}** 😢`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})