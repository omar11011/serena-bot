const { Capture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    body.id = Date.now()
    
    // Cálculo del IV
    let iv = body.stats.hp + body.stats.attack + body.stats.defense + body.stats.spattack + body.stats.spdefense + body.stats.speed
    iv = (iv * 100 / 186).toFixed(2)
    body.stats.iv = iv

    let data = await Capture.create(body)

    return response(res, 200, data._doc)
}