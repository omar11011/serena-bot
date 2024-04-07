const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

const calculateDamage = require('../../utils/calculateDamage')

module.exports = async (req, res) => {
    let msgs = []
    let finish = false
    let { me, rival } = req.body

    if (!me || !rival || !me.turn.move) return response(res, 200, { error: 'Datos incompletos.' })
    
    if (!me.turn.damage) {
        let calculate = await calculateDamage(req.body)
        if (calculate.newName) me.turn.move = calculate.newName
        me.turn.lastDamage = me.turn.damage = calculate.damage
        me.lastPriority = calculate.priority
    }

    if (me.turn.damage !== null && rival.turn.damage !== null) {
        let tie = 0
        let trainers = [me, rival]
        let win, loser

        trainers.map((t, i) => {
            let hp

            t.stats.forEach(e => {
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
            msgs.push(`${t.shiny ? '⭐ ' : ''}**${t.name}**\nEntrenador: ${isNaN(t.owner) ? t.owner : `<@${t.owner}>`}\nHP: ${hp}\nTurno: ${t.name} ${t.turn.move ? `ha usado ${t.turn.move}${t.turn.damage ? ` causando ${t.turn.damage} puntos de daño` : ''}.` : `no ha usado ningún movimiento.`}`)
        })

        if (tie > 0) {
            finish = true
            win = me
            loser = rival

            if (tie > 1) {
                let higherPriority = rival.turn.lastPriority > me.turn.lastPriority
                let higherSpeed = rival.stats.find(e => e.key === 'speed').power > me.stats.find(e => e.key === 'speed').power

                if (higherSpeed || higherPriority) {
                    win = rival
                    loser = me
                }
    
                msgs.push(`${win.name} ha sido más rápido, por lo que ha golpeado primero.`)
                win.stats.forEach(e => {
                    if (e.key === 'hp') {
                        e.power += loser.turn.damage
                        msgs.forEach(msg => {
                            if (msg.includes(win.owner)) msg.replace('0/', `${e.power}/`)
                        })
                    }
                })
            }
            else {
                if (rival.stats.find(e => e.key === 'hp').power > 0) {
                    win = rival
                    loser = me
                }
            }

            msgs.push(`¡${isNaN(win.owner) ? win.owner : `<@${win.owner}>`} y ${win.shiny ? '⭐ ' : ''}${win.name} han ganado el combate!`)
        }

        me.turn.move = me.turn.damage = me.turn.lastPriority = me.turn.lastTurn = null
        rival.turn.move = rival.turn.damage = rival.turn.lastPriority = rival.turn.lastTurn = null
        me.turn.willUseZMove = rival.turn.willUseZMove = false
    }

    await SerenaDuelData.updateOne({ _id: me._id }, me)
    await SerenaDuelData.updateOne({ _id: rival._id }, rival)
    
    return response(res, 200, { finish, msgs })
}