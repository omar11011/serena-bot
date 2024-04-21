const { axios } = require('../services')

module.exports = async props => {
    let result = {
        error: null,
        levelUp: false,
    }
    let { pokemon, xp } = props

    if (!pokemon) {
        result.error = 'No se incluyó al pokémon capturado.'
        return result
    }
    if (!xp) xp = Math.ceil(Math.random() * 5)

    result.xp = xp
    result.levelUp = pokemon.progress.xp >= pokemon.progress.level * 100

    await axios.update({
        url: 'serena/capture',
        props: {
            _id: pokemon._id,
            inc: {
                'progress.level': result.levelUp ? 1 : 0,
                'progress.xp': xp - (result.levelUp ? pokemon.progress.level * 100 - pokemon.progress.xp : 0),
            },
        },
    })

    return result
}