const { response } = require('../../utils')
const models = require('../../models')

module.exports = async (req, res) => {
    let id = req.params.id
    let opt = {}

    if (isNaN(id)) opt.name = { $regex: new RegExp(id, 'i') }
    else opt.id = parseInt(id)

    let data = await models.PokemonMovement.findOne(opt)
    
    return response(res, 200, data)
}