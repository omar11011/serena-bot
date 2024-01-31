const response = require('../../utils/response')
const findElement = require('../../data/functions/findElement')

module.exports = async (req, res) => {
    let id = req.params.id
    let { category } = req.query

    if (!category || category === '') category = 'nivel'

    let data = findElement('PokemonForm', id)

    if (data) {
        const movements = data.movements.filter(e => e.category === category.toLowerCase()).filter(e => findElement('Movement', e.name))

        data = {
            pokemon: data.name,
            movements: movements,
            image: data.images.front_default,
        }
    }

    return response(res, 200, data)
}