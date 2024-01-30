const { Gif } = require('../../models')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const data = await Gif.find().select('url category')

    return response(res, 200, data)
}