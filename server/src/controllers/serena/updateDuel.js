const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

const calculateDamage = require('../../utils/calculateDamage')

module.exports = async (req, res) => {
    let msgs = []
    let data = req.body
    let win, loser
    
    if (!data.user.turn.damage) {
        data = await calculateDamage(data)
    }

    let { user, rival } = req.body

    if (user.turn.damage !== null && rival.turn.damage !== null) {
        let tie = 0
        let trainers = [user, rival]

        trainers.map((t, i) => {
            let hp
            let { pokemon } = t

            pokemon.stats.forEach(e => {
                if (e.key === 'hp') {
                    e.power -= trainers[i === 0 ? 1 : 0].turn.damage || 0
                    if (e.power <= 0) {
                        tie += 1
                        e.power = 0
                    }
                    hp = `${e.power}/${e.initialPower}`
                }
                return e
            })
            msgs.push(`${pokemon.shiny ? '⭐ ' : ''}**${pokemon.name}**\nEntrenador: ${isNaN(t.battle.user) ? t.battle.user : `<@${t.battle.user}>`}\nHP: ${hp}\nTurno: ${pokemon.name} ${t.turn.move ? `ha usado ${t.turn.move}${t.turn.damage ? ` causando ${t.turn.damage} puntos de daño` : ''}.${t.turn.lastHits > 1 ? `El ataque ha golpeado ${t.turn.lastHits} veces.` : ''}` : `no ha usado ningún movimiento.`}`)
        })

        if (tie > 0) {
            user.battle.finish = rival.battle.finish = true
            win = user
            loser = rival

            if (tie > 1) {
                let higherPriority = rival.turn.lastPriority > user.turn.lastPriority
                let higherSpeed = rival.pokemon.stats.find(e => e.key === 'speed').power > user.pokemon.stats.find(e => e.key === 'speed').power

                if (higherSpeed || higherPriority) {
                    win = rival
                    loser = user
                }
    
                msgs.push(`${win.pokemon.name} ha sido más rápido, por lo que ha golpeado primero.`)
                win.pokemon.stats.forEach(e => {
                    if (e.key === 'hp') {
                        e.power += loser.turn.damage
                        msgs.forEach(msg => {
                            if (msg.includes(win.battle.user)) msg.replace('0/', `${e.power}/`)
                        })
                    }
                })
            }
            else {
                if (rival.pokemon.stats.find(e => e.key === 'hp').power > 0) {
                    win = rival
                    loser = user
                }
            }

            msgs.push(`¡${isNaN(win.battle.user) ? win.battle.user : `<@${win.battle.user}>`} y ${win.pokemon.shiny ? '⭐ ' : ''}${win.pokemon.name} han ganado el combate!`)
        }

        user.turn.move = user.turn.damage = user.turn.lastPriority = user.turn.lastTurn = null
        rival.turn.move = rival.turn.damage = rival.turn.lastPriority = rival.turn.lastTurn = null
        user.turn.willUseZMove = rival.turn.willUseZMove = false
    }

    await SerenaDuelData.updateOne({ _id: user._id }, user)
    await SerenaDuelData.updateOne({ _id: rival._id }, rival)
    
    return response(res, 200, {
        finish: user.battle.finish ? {
            userId: win.battle.user,
            pokemonId: win.pokemon.code,
        } : false,
        msgs,
    })
}