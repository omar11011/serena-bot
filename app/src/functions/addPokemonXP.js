const { axios } = require('../services')

module.exports = async props => {
    let result = {
        error: 'No se encontró al pokémon capturado.',
        levelUp: false,
    }
    let { pokemon, xp } = props

    if (!pokemon) return result
    if (typeof pokemon === 'string') {
        pokemon = (await axios.get({
            url: `serena/capture?code=${pokemon}&limit=1`,
        })).data.data

        if (pokemon.length < 1) return result
        else pokemon = pokemon[0]
    }
    if (!xp) xp = Math.ceil(Math.random() * 5)

    result.error = false
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