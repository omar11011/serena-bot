const { SerenaUser } = require('../../models')
const { response } = require('../../utils')

let chargeData = require('../../data/functions/chargeData')
let regions = chargeData('Pokemon', 'Region')

module.exports = async (req, res) => {
    let body = req.body
    let created = false
    
    if (!body.user) return response(res, 402)

    try {
        body.trainer = { region: regions[Math.floor(Math.random() * regions.length)].name }
        data = await SerenaUser.create(body)
        created = true
    }
    catch {
        data = await SerenaUser.findOne({ user: body.user })
    }
    finally {
        data = data._doc
        data.created = created

        return response(res, 200, data)
    }
}