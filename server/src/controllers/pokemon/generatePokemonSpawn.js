const { response } = require('../../utils')
const models = require('../../models')

module.exports = async (req, res) => {
    let opt = {}
    let { redeem } = req.query
    let random = Math.ceil(Math.random() * 1000)
    let special = (await models.PokemonSpecie.find({
        $or: [
            { isMythical: true },
            { isLegendary: true },
            { isUltraBeast: true },
        ],
    }).select('name')).map(e => e._doc.name)

    if (random > 990) opt.specie = { $in: special }
    else opt.specie = { $nin: special }

    let pokemon = await models.PokemonForm.aggregate([
        { $match: { $and: [opt, { spawn: true }] } },
        { $project: { name: 1, specie: 1, types: 1, stats: 1, images: 1 } },
        { $sample: { size: 1 } },
    ])

    if (pokemon.length > 0) {
        pokemon = pokemon[0]

        // Gender
        let { gender } = await models.PokemonSpecie.findOne({ name: pokemon.specie }).select('gender')
        let probGender = Math.ceil(Math.random() * 100)
        pokemon.gender = gender.male === 0 && gender.female === 0 ? 'none' : probGender < gender.male ? 'male' : 'female'

        // Stats
        let minStat = redeem == 'yes' ? 25 : 1
        pokemon.stats = pokemon.stats.map(e => {
            e.points = minStat + Math.floor(Math.random() * (32 - minStat))
            return e
        })

        // Shiny: 0.2% normal, 1% redeem
        let probShiny = Math.ceil(Math.random() * 100000)
        if (probShiny > 99800 - (redeem == 'yes' ? 800 : 0)) pokemon.shiny = true

        // Image
        pokemon.image = pokemon.shiny ? pokemon.images.front_shiny : pokemon.images.front_default

        delete pokemon._id
        delete pokemon.images
    }

    return response(res, 200, pokemon)
}