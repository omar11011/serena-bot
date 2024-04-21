const Command = require('../../class/Command')
const checkWord = require('../../utils/checkWord')
const getPokemonSelect = require('../../functions/getPokemonSelect')
const { axios } = require('../../services')

module.exports = new Command({
    name: "replace",
    description: "Has que tu pokémon olvide un movimiento aprendido.",
    args: ['move'],
    cooldown: 4,
	async execute(message, props) {
        let move = checkWord(props.args.join(' ').toLowerCase())
        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        let index = pokemon.movements.map(e => checkWord(e.name.toLowerCase())).indexOf(move)
        if (index < 0)  return message.react('🧐')

        let nameMove = pokemon.movements[index].name
        pokemon.movements.splice(index, 1)

        message.reply(`**${pokemon.alias || pokemon.name}** está a punto de olvidar **${nameMove}**. Responde ` + '`sí` o `yes` para aceptar.').then(msg => {
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
                            set: { movements: pokemon.movements },
                        },
                    })

                    return m.reply(`**${pokemon.alias || pokemon.name}** ha olvidado el movimiento **${nameMove}**.`)
                }
            })

            collector.on('end', () => msg.react('⌛'))
        })
	},
})