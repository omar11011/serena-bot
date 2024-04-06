const { SerenaCapture } = require('../../models')
const { response } = require('../../utils')

const natures = require('../../data/content/Pokemon/Nature')

module.exports = async (req, res) => {
    let body = req.body
    
    if (!body.name) return response(res, 402)

    body.code = String(Date.now()) + Math.floor(Math.random() * 10)
    body.nature = natures[Math.floor(Math.random() * natures.length)].name

    let data = await SerenaCapture.create(body)

    return response(res, 200, data._doc)
}