const { response } = require('../../utils')
const { Capture } = require('../../models')

const megadb = require('megadb')
const db = new megadb.crearDB('spawn')

module.exports = async (req, res) => {
    let obj = []
    let data = []
    let body = req.body

    if (body.category) {
        let pkmOpts = await db.obtener(body.category) || []
        obj.push({
            ['pokemon.name']: { $in: pkmOpts }
        })
        delete body.category
    }

    if (body.market) {
        obj.push({
            marketPrice: { $ne: null }
        })
        delete body.market
    }

    if (body.name) {
        obj.push({
            $or: [
                { 'pokemon.name': { $regex: body.name, $options: 'i' } },
                { 'pokemon.alias': { $regex: body.name, $options: 'i' } },
            ],
        })
        delete body.name
    }

    let skip, page, limit, sort

    if (body.skip) skip = isNaN(body.skip) ? 0 : parseInt(body.skip)
    if (body.limit) limit = isNaN(body.limit) ? 1 : parseInt(body.limit)

    if (!body.sort) sort = 1
    else {
        if (body.sort.toLowerCase() !== 'asc') sort = -1
    }

    if (!body.page) {
        if (!skip) skip = 0
        if (!limit) limit = 1
    }
    else {
        page = isNaN(body.page) ? 1 : parseInt(body.page)
        limit = 15
        skip = limit * (page - 1)
    }

    delete body.skip
    delete body.page
    delete body.limit
    delete body.sort
    
    Object.entries(body).map(([key, value]) => {
        obj.push({ [key]: value })
    })
    
    if (obj.length > 0) data = await Capture.find({ $and: obj })
                                .sort({ marketPrice: sort })
                                .select('id user pokemon shiny level gender stats marketPrice')

    let count = data.length
    let maxPage = Math.ceil(count / limit)

    data = data.slice((page - 1) * limit, limit)

    data.map((e, i) => {
        e = e._doc
        e.iv = ((e.stats.hp + e.stats.attack + e.stats.defense + e.stats.spattack + e.stats.spdefense + e.stats.speed) * 100 / 186).toFixed(2)
        delete e.stats
    })

    return response(res, 200, {
        count,
        page,
        maxPage,
        limit,
        skip,
        list: data,
    })
}