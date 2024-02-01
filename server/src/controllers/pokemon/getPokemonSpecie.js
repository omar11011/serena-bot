const { response } = require('../../utils')
const findKey = require('../../data/functions/findKey')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let data = findElement('PokemonSpecie', id)

    if (data) {
        data.forms = findKey('PokemonForm', 'name', data.name)
        if (data.forms) {
            let f = data.forms.find(e => e.name === data.name)
            if (f) data.types = f.types
        }
        data.forms = data.forms.map(e => e.name)
    }
    
    return response(res, 200, data)
}