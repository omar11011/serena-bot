const { Capture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    let data = await Capture.create(body)

    return response(res, 200, data._doc)
}