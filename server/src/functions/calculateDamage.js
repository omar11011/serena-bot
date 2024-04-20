const models = require('../models')

const usedZMove = require('../functions/usedZMove')
const statChanges = require('../functions/statChanges')
const stateChanges = require('../functions/stateChanges')

module.exports = async data => {
    let canAttack = true
    let { user, rival } = data

    try {
        if (Math.ceil(Math.random() * 100) > user.turn.precision) {
            user.turn.damage = 0
            return
        }

        let usedMove = await models.PokemonMovement.findOne({ name: user.turn.move })
        let myPokemon = await models.PokemonForm.findOne({ name: user.pokemon.name })
        let rivalPokemon = await models.PokemonForm.findOne({ name: rival.pokemon.name })

        // Cambios de estado
        if (usedMove.stateChanges) {
            canAttack = stateChanges(user, rival, usedMove, canAttack)
        }

        if (usedMove.class !== 'Estado' && canAttack) {
            let type = await models.PokemonType.findOne({ name: usedMove.type })
            
            let B = myPokemon.types.includes(usedMove.type) ? 1.5 : 1
            let E = 1
            let N = user.pokemon.progress.level
            let V = 85 + Math.floor(Math.random() * 16)
            let A = user.pokemon.stats.find(e => e.key === (usedMove.class === 'Especial' ? 'spattack' : 'attack')).power
            let P = usedMove.power
            let D = rival.pokemon.stats.find(e => e.key === (usedMove.class === 'Especial' ? 'spdefense' : 'defense')).power
            
            rivalPokemon.types.forEach(e => {
                let effectiveness = type.effectiveness
                if (effectiveness.high.includes(e)) E *= 2
                else if (effectiveness.low.includes(e)) E *= 0.5
                else if (effectiveness.immune.includes(e)) E *= 0
            })

            // Uso del Movimiento Z
            if (user.turn.willUseZMove && !user.turn.usedZMove && user.item && !user.isMega && !user.isGiga) {
                P = usedZMove(user, usedMove, P)
            }

            user.lastHits = Math.ceil(Math.random() * usedMove.hits)
            user.turn.priority = usedMove.priority
            user.turn.lastDamage = user.turn.damage = Math.round(0.01 * B * E * V * ((0.2 * N + 1) * A * P / (25 * D) + 2)) * user.lastHits
        }

        // Cambios en las estadísticas
        if (usedMove.statChanges && canAttack) {
            statChanges(user, rival, myPokemon, rivalPokemon, usedMove)
        }

        if (!canAttack) {
            user.turn.lastDamage = user.turn.damage = 0
        }
    }
    catch {
        console.log('Ocurrió un error inesperado al calcular los valores del movimiento', user.turn.move)
    }
    finally {
        return data
    }
}