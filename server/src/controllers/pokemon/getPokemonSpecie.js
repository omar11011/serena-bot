const { response } = require('../../utils')
const models = require('../../models')

module.exports = async (req, res) => {
    let id = req.params.id
    let opt = {}

    if (isNaN(id)) opt.name = { $regex: new RegExp(id, 'i') }
    else opt.pokedex = parseInt(id)

    let data = await models.PokemonSpecie.findOne(opt)

    if (data) {
        data = data._doc
        data.forms = await models.PokemonForm.find({ specie: data.name }).select('id name')
    }
    
    return response(res, 200, data)
}