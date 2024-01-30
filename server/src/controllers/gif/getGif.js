const { Gif } = require('../../models')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const ctg = req.params.ctg
    const allGifs = await Gif.find({ category: ctg })
    
    if (allGifs.length < 0) return response(res, 200, { error: 'No se encontraron gifs para esta categoría.' })

    const gif = allGifs[Math.floor(Math.random() * allGifs.length)]

    return response(res, 200, gif)
}