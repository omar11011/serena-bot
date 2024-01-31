const response = require('../../utils/response')
const findKey = require('../../data/functions/findKey')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let data = findElement('PokemonSpecie', isNaN(id) ? id : parseInt(id))

    if (data) {
        data.forms = findKey('PokemonForm', 'name', data.name).map(e => e.name)
    }

    return response(res, 200, data)
}