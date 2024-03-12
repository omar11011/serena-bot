const { SerenaCapture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    
    if (!body.name) return response(res, 402)

    let data = await SerenaCapture.create(body)

    return response(res, 200, data._doc)
}