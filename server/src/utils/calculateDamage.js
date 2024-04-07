const models = require('../models')

module.exports = async data => {
    let { user, rival } = data

    try {
        if (Math.ceil(Math.random() * 100) > user.turn.precision) {
            user.turn.damage = 0
            return
        }

        let usedMove = await models.PokemonMovement.findOne({ name: user.turn.move })

        if (usedMove.class === 'Estado') {
            return
        }

        let type = await models.PokemonType.findOne({ name: usedMove.type })
        let myPokemon = await models.PokemonForm.findOne({ name: user.pokemon.name })
        let rivalPokemon = await models.PokemonForm.findOne({ name: rival.pokemon.name })
        
        let B = myPokemon.types.includes(usedMove.type) ? 1.5 : 1
        let E = 1
        let N = user.pokemon.progress.level
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

        // Uso del Movimiento Z
        if (user.turn.willUseZMove && !user.turn.usedZMove && user.item && !user.isMega && !user.isGiga) {
            let crystal = usedMove.z_move.find(e => e.pokemon.length > 0 ? e.item === user.pokemon.equippedItem && e.pokemon.includes(e.pokemon.specie) : e.item === user.pokemon.equippedItem)
            if (crystal) {
                P = crystal.power
                user.turn.move = crystal.newName
                user.turn.usedZMove = true
            }
        }

        user.turn.priority = usedMove.priority
        user.turn.lastDamage = user.turn.damage = Math.round(0.01 * B * E * V * ((0.2 * N + 1) * A * P / (25 * D) + 2))
    }
    catch {
        console.log('Ocurrió un error inesperado al calcular los valores del movimiento', user.turn.move)
    }
    finally {
        return data
    }
}