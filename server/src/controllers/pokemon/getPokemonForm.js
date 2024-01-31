const response = require('../../utils/response')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let data = findElement('PokemonForm', id)

    if (data) {
        delete data.movements
    }

    return response(res, 200, data)
}