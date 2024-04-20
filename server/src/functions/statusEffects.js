module.exports = (user, rival, canAttack, newly) => {
    let msgs = user.turn.msgs
    let state = user.turn.currentState.toLowerCase()
    let prob = Math.floor(Math.random() * 100)

    if (state === 'paralizado') {
        if (prob < 25) canAttack = false
        if (newly) {
            user.pokemon.stats.forEach(e => {
                if (e.key === 'speed') e.power = Math.round(e.power / 2)
            })
            msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
        }
    }
    else if (state === 'quemado') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Math.round(e.power * 15 / 16)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
            if (e.key === 'attack' && newly) {
                e.power = Math.round(e.power / 2)
            }
        })
    }
    else if (state === 'envenenado') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Mat.round(e.power * 7 / 8)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
    }
    else if (state === 'gravemente envenenado') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Mat.round(e.power * 4 / 5)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
    }
    else if (state === 'dormido') canAttack = false
    else if (state === 'somnoliento') {
        if (prob < 50) canAttack = false
    }
    else if (state === 'congelado') {
        if (prob < 80) canAttack = false
    }
    else if (state === 'helado') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Math.round(e.power * 15 / 16)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
            if (e.key === 'spattack' && newly) {
                e.power = Math.round(e.power / 2)
                msgs.push(`El ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
    }
    else if (state === 'confuso') {
        if (prob > 33) user.turn.currentState = null
        else msgs.push(`${user.pokemon.name} se ha herido a sí mismo.`)
    }
    else if (state === 'maldito') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Mat.round(e.power * 3 / 4)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
    }
    else if (state === 'enamorado') {
        if (prob < 25) canAttack = false
    }
    else if (state === 'apresado') {
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power = Mat.round(e.power * 9 / 10)
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
    }
    else if (state === 'drenadoras') {
        let points = 0
        user.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                points = Math.round(e.power / 8)
                e.power -= points
                msgs.push(`La ${e.name} de ${user.pokemon.name} ha disminuido.`)
            }
        })
        rival.pokemon.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power += points
                msgs.push(`La ${e.name} de ${rival.pokemon.name} ha aumentado.`)
            }
        })
    }
    else if (state === 'amedrentado') canAttack = false

    user.pokemon.stats.forEach(e => {
        if (e.key === 'hp' && e.power <= 0) canAttack = false
    })

    if (!canAttack) msgs.push(`${user.pokemon.name} no ha podido completar su ataque.`)

    return canAttack
}