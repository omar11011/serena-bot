const { response } = require('../../utils')
const { Capture } = require('../../models')

module.exports = async (req, res) => {
    let id = req.params.id
    let data = await Capture.findOne({ id })

    return response(res, 200, data)
}