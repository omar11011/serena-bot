const { SerenaCapture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let ids
    let opts = {
        page: 1,
        skip: 0,
        limit: 15,
        sort: 1,
    }
    let options = []
    let query = req.query

    if (query.page && !isNaN(query.page)) opts.page = Math.abs(parseInt(query.page))

    if (query.skip && !isNaN(query.skip)) opts.skip = Math.abs(parseInt(query.skip)) - 1

    if (query.limit && !isNaN(query.limit)) opts.limit = Math.abs(parseInt(query.limit))

    if (query.desc && query.desc.toLowerCase() === 'yes') opts.sort = -1

    // ID filter
    if (query._id) options.push({ _id: query._id })

    // Owner filter
    if (query.owner) {
        options.push({ owner: { $regex: new RegExp(query.owner, 'i') } })

        ids = (await SerenaCapture.find({ owner: query.owner }).select('_id').sort({ createdAt: 1 })).map(doc => doc._id.toString())

        opts.capturedPokemon = ids.length
        opts.maxPage = Math.ceil(ids.length / opts.limit)
    }

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
    .skip(opts.skip + (opts.page - 1) * opts.limit)
    .limit(opts.limit * opts.page)
    .sort({ createdAt: opts.sort })

    if (ids) {
        data = data.map(e => {
            e = e._doc
            e.position = ids.indexOf(e._id.toString()) + 1
            return e
        })
    }

    return response(res, 200, { opts, data })
}