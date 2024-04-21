const Command = require('../../class/Command')
const getPokemonSelect = require('../../functions/getPokemonSelect')
const addPokemonXP = require('../../functions/addPokemonXP')

module.exports = new Command({
    name: "catch",
    description: "Entrena a tu pokémon.",
    cooldown: 30,
	async execute(message, props) {
        let pokemon = await getPokemonSelect(message.author.id)
        if (!pokemon) return message.reply('No tienes ningún pokémon seleccionado.')

        let train = await addPokemonXP({ pokemon })
        if (train.error) return message.reply(train.error)

        return message.reply(`**${pokemon.alias || pokemon.name}** ha sumado **${train.xp}** puntos de experiencia${train.levelUp ? ` y ha subido un nivel` : ''}.`)
	},
})