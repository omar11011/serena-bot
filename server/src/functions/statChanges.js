module.exports = (user, rival, myPokemon, rivalPokemon, move) => {
    move.statChanges.forEach(e => {
        let prob = e.prob > Math.floor(Math.random() * 100)

        if (prob) {
            let affectedUser = e.toUser ? user : rival
            
            if (e.stat === 'precision') {
                affectedUser.turn.precision += e.points
                affectedUser.turn.msgs.push(`La precisión de ${affectedUser.pokemon.name} ha sido afectada en ${e.points > 0 ? '+' : '-'}${e.points} puntos.`)
            }
            else {
                let stat = affectedUser.pokemon.stats.find(s => s.key === e.stat)
                if (stat) {
                    if (e.stat === 'hp') {
                        let points = Math.round(stat.initialPower * e.points / 100)
                        if (stat.power + points > stat.initialPower) {
                            stat.power = stat.initialPower
                            points = stat.initialPower - stat.power
                        }
                        stat.power += points
                    }
                    else {
                        let base = (e.toUser ? myPokemon : rivalPokemon).stats.find(f => f.key === e.stat).points
                        stat.points += e.points
                        stat.power = ((2 * base + stat.points + stat.effort_points / 4) * affectedUser.pokemon.progress.level / 100 + 5) * stat.nature
                        stat.power = Math.floor(stat.power)
                    }
                    affectedUser.turn.msgs.push(`${['attack', 'spattack'].includes(e.stat) ? 'El' : 'La'} ${stat.name} de ${affectedUser.pokemon.name} ha ${e.points > 0 ? 'aumentado' : 'disminuido'} en ${Math.abs(e.points)} punto${e.points > 1 ? 's' : ''}.`)
                }
            }
        }
    })
}