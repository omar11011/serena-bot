const Command = require('../../class/Command')
const checkWord = require('../../utils/checkWord')
const getPokemonSelect = require('../../functions/getPokemonSelect')
const { axios } = require('../../services')

module.exports = new Command({
    name: "learn",
    description: "Enséñale un nuevo movimiento por nivel a tu pokémon.",
    args: ['move'],
    cooldown: 4,
	async execute(message, props) {
        let maxMoves = 4
        let nameMove = checkWord(props.args.join(' ').toLowerCase())
        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        let currentMoves = pokemon.movements.filter(e => e.category == 'nivel').map(e => checkWord(e.name.toLowerCase()))

        if (currentMoves.includes(nameMove)) return message.reply(`**${pokemon.alias || pokemon.name}** ya conoce este movimiento.`)
        if (currentMoves.length == maxMoves) return message.reply(`**${pokemon.alias || pokemon.name}** ya conoce sus ${maxMoves} movimientos.`)

        let form = (await axios.get({
            url: `pokemon/form/${pokemon.name}`,
        })).data

        let possibles = form.movements.filter(e => e.category == 'nivel')
        let newMove = possibles.map(e => checkWord(e.name.toLowerCase())).indexOf(nameMove)

        if (newMove < 0) return message.react('🧐')
        if (possibles[newMove].level > pokemon.progress.level) return message.reply(`**${pokemon.alias || pokemon.name}** no tiene el nivel suficiente para aprender este movimiento.`)

        newMove = possibles[newMove].name
        pokemon.movements.push({ name: newMove })

        await axios.update({
            url: 'serena/capture',
            props: {
                _id: pokemon._id,
                set: { movements: pokemon.movements },
            },
        })

        return message.reply(`**${pokemon.alias || pokemon.name}** ha aprendido **${newMove}**.`)
	},
})