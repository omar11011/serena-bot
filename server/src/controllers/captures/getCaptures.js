const { response } = require('../../utils')
const { Capture } = require('../../models')

module.exports = async (req, res) => {
    let user = req.params.user
    let obj = { user }
    let { skip, limit, page, sort, select } = req.query

    if (skip) skip = isNaN(skip) ? 0 : parseInt(skip)
    if (limit) skip = isNaN(limit) ? 1 : parseInt(limit)
    if (select) obj.select = true
   
    if (!sort) sort = 1
    else {
        if (sort.toLowerCase() !== 'asc') sort = -1
    }

    if (!page) {
        if (!skip) skip = 0
        if (!limit) limit = 1
    }
    else {
        page = isNaN(page) ? 1 : parseInt(page)
        limit = 15
        skip = limit * (page - 1)
    }
    
    let list = await Capture.find(obj)
                        .sort({ createdAt: sort })
                        .skip(skip)
                        .limit(limit)
                        .select(limit > 1 ? 'pokemon shiny level stats' : '')

    if (limit === 1 && list.length > 0) list = list[0]
    if (Array.isArray(list)) {
        let count = await Capture.countDocuments(obj)

        list.map((e, i) => {
            e = e._doc
            e.id = (page - 1) * limit + (i + 1)
            e.iv = ((e.stats.hp + e.stats.attack + e.stats.defense + e.stats.spattack + e.stats.spdefense + e.stats.speed) * 100 / 186).toFixed(2)
            delete e.stats
        })

        list = {
            count,
            page,
            limit,
            maxPage: Math.ceil(count / limit),
            list,
        }
    }
    
    return response(res, 200, list)
}