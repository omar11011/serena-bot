const { Anime } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    let data = await Anime.findOne({ image: body.image })

    if (!data) await Anime.create(body)

    return response(res, 200, { created: data ? true : false })
}