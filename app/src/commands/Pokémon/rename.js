const Command = require('../../class/Command')
const getPokemonSelect = require('../../functions/getPokemonSelect')
const { axios } = require('../../services')

module.exports = new Command({
    name: "rename",
    description: "Cambia el nombre de tu compañero por un alias.",
	async execute(message, props) {
        let alias = props.args.length > 0 ? props.args.join(" ") : null
        if (alias && alias.length > 15) return message.reply(`El nombre de tu pokémon no puede tener más de 12 caracteres.`)

        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        if (alias && pokemon.name.toLowerCase() === alias.toLowerCase()) alias = null

        message.reply(`¿Estás segur@ de querer nombrar a ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}** como **${alias ? alias : pokemon.name}**? Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
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
                            set: { alias },
                        },
                    })

                    return m.reply(`Acabas de nombrar a ${pokemon.shiny ? '⭐ ' : ''}**${pokemon.alias || pokemon.name}** como **${alias ? alias : pokemon.name}**.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})