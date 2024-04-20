const statusEffect = require('./statusEffects')

module.exports = (user, rival, move, canAttack) => {
    let newly = false

    if (!user.turn.name && !rival.turn.name) {
        if (user.turn.futureState) {
            user.turn.currentState = user.turn.futureState
            user.turn.futureState = null
            user.turn.msgs.push(`${user.pokemon.name} se encuentra ${user.turn.currentState}.`)
            newly = true
        }

        if (rival.turn.futureState) {
            rival.turn.currentState = rival.turn.futureState
            rival.turn.futureState = null
            rival.turn.msgs.push(`${rival.pokemon.name} se encuentra ${user.turn.currentState}.`)
        }
    }

    if (!newly) {
        let prob = Math.floor(Math.random() * 100)
        if (prob < 50) user.turn.currentState = null
    }

    if (user.turn.currentState) canAttack = statusEffect(user, rival, canAttack, newly)

    if (canAttack) {
        move.stateChanges.forEach(e => {
            const prob = e.prob > Math.floor(Math.random() * 100)
    
            if (prob) {
                let affectedUser = e.toUser ? user : rival
                affectedUser.turn.futureState = e.state
            }
        })
    }

    return canAttack
}