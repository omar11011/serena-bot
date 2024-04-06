const { SerenaDuelData } = require('../../models')
const calculateDamage = require('../../utils/calculateDamage')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let { me, rival } = req.body
    if (!me || !rival || !me.turn.move) return response(res, 200, { error: 'Datos incompletos.' })
    
    if (!me.turn.damage) {
        me.turn.lastDamage = me.turn.damage = await calculateDamage(req.body)
    }

    if (me.turn.damage !== null && rival.turn.damage !== null) {
        let tie = 0
        me.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power -= rival.turn.damage
                if (e.power <= 0) tie += 1
            }
        })
        rival.stats.forEach(e => {
            if (e.key === 'hp') {
                e.power -= me.turn.damage
                if (e.power <= 0) tie += 1
            }
        })

        if (tie > 1) {
            let win = me
            let loser = rival

            if (rival.stats.find(e => e.key === 'speed').power > me.stats.find(e => e.key === 'speed').power) {
                win = rival
                loser = me
            }

            win.stats.forEach(e => {
                if (e.key === 'hp') e.power += loser.turn.damage
            })
        }

        me.turn.move = me.turn.damage = me.turn.lastTurn = null
        rival.turn.move = rival.turn.damage = rival.turn.lastTurn = null
        me.turn.willUseZMove = rival.turn.willUseZMove = false
    }

    await SerenaDuelData.updateOne({ _id: me._id }, me)
    await SerenaDuelData.updateOne({ _id: rival._id }, rival)
    
    return response(res, 200, { me, rival })
}