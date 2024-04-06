const models = require('../models')

module.exports = async data => {
    let { me, rival } = data

    if (Math.ceil(Math.random() * 100) > me.turn.precision) return 0

    try {
        let usedMove = await models.PokemonMovement.findOne({ name: me.turn.move })

        if (usedMove.class === 'Estado') {
            return
        }

        let type = await models.PokemonType.findOne({ name: usedMove.type })
        let myPokemon = await models.PokemonForm.findOne({ name: me.name })
        let rivalPokemon = await models.PokemonForm.findOne({ name: rival.name })
        
        let B = myPokemon.types.includes(usedMove.type) ? 1.5 : 1
        let E = 1
        let N = me.progress.level
        let V = 85 + Math.floor(Math.random() * 16)
        let A = myPokemon.stats.find(e => e.key === (usedMove.class === 'Especial' ? 'spattack' : 'attack')).points
        let P = usedMove.power
        let D = rivalPokemon.stats.find(e => e.key === (usedMove.class === 'Especial' ? 'spdefense' : 'defense')).points
        
        rivalPokemon.types.forEach(e => {
            let effectiveness = type.effectiveness
            if (effectiveness.high.includes(e)) E *= 2
            else if (effectiveness.low.includes(e)) E *= 0.5
            else if (effectiveness.immune.includes(e)) E *= 0
        })

        let damage = 0.01 * B * E * V * ((0.2 * N + 1) * A * P / (25 * D) + 2)

        return Math.round(damage)
    }
    catch {
        return 0
    }
}