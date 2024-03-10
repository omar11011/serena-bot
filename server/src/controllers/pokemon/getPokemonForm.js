const { response } = require('../../utils')
const models = require('../../models')

module.exports = async (req, res) => {
    let id = req.params.id
    let opt = {}

    if (isNaN(id)) opt.name = { $regex: new RegExp(id, 'i') }
    else opt.id = parseInt(id)

    let data = await models.PokemonForm.findOne(opt)

    if (data) {
        data = data._doc
        
        // Evoluciones disponibles
        let evolutions = data.evolutions.map(e => e.form)
        let existEvolutions = (await models.PokemonForm.find({ name: { $in: evolutions } }).select('name')).map(e => e._doc.name)
        data.evolutions = data.evolutions.filter(e => existEvolutions.includes(e.form))
        
        // Movimientos disponibles
        let moves = data.movements.map(e => e.name)
        let existMoves = (await models.PokemonMovement.find({ name: { $in: moves } }).select('name')).map(e => e._doc.name)
        data.movements = data.movements.filter(e => existMoves.includes(e.name))
    }

    return response(res, 200, data)
}