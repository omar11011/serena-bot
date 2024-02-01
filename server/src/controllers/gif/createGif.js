const { Gif } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    let data = await Gif.findOne({
        url: body.url,
        category: body.category,
    })

    if (!data) await Gif.create(body)

    return response(res, 200, { created: data ? true : false })
}