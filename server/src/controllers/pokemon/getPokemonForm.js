const response = require('../../utils/response')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let query = req.query
    let props = { db: 'PokemonForm', short: true }
    console.log(query)
    if (!isNaN(id)) props.id = parseInt(id)
    else props.name = id

    let data = findElement(props)

    return response(res, 200, data)
}