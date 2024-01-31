const response = require('../../utils/response')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let data = findElement('Movement', id)

    return response(res, 200, data)
}