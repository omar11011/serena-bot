const { Anime } = require('../../models')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    const typeCharacter = req.params.character.toLowerCase()
    const opt = {}

    if (typeCharacter === 'waifu') opt.isWaifu = true
    else if (typeCharacter === 'husbando') opt.isHusbando = true

    const data = await Anime.find(opt).select('image isWaifu isHusbando')

    return response(res, 200, data)
}