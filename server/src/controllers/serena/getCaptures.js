const { SerenaCapture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let options = []
    let query = req.query

    if (query.page && !isNaN(query.page)) query.page = Math.abs(parseInt(query.page))
    else query.page = 1

    if (query.skip && !isNaN(query.skip)) query.skip = Math.abs(parseInt(query.skip)) - 1
    else query.skip = 0

    if (query.limit && !isNaN(query.limit)) query.limit = Math.abs(parseInt(query.limit))
    else query.limit = 15

    // Owner filter
    if (query.owner) options.push({ owner: { $regex: new RegExp(query.owner, 'i') } })

    // Shiny filter
    if (query.shiny && query.shiny.toLowerCase() === 'yes') options.push({ shiny: true })

    // Selected filter
    if (query.select && query.select.toLowerCase() === 'yes') options.push({ 'options.isSelected': true })

    // Favorite filter
    if (query.favorite && query.favorite.toLowerCase() === 'yes') options.push({ 'options.isFavorite': true })

    // Market filter
    if (query.market && query.market.toLowerCase() === 'yes') options.push({ 'options.onSale': true })

    // Name filter
    if (query.name) {
        options.push({
            $or: [
                { name: { $regex: new RegExp(query.name, 'i') } },
                { alias: { $regex: new RegExp(query.name, 'i') } },
            ],
        })
    }

    let data = await SerenaCapture.find(options.length < 1 ? {} : {
        $and: options,
    })
    .skip(query.skip + (query.page - 1) * query.limit)
    .limit(query.limit * query.page)

    return response(res, 200, data)
}