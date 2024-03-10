const { SerenaServer } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    let created = false
    
    if (!body.server) return response(res, 402)

    try {
        data = await SerenaServer.create(body)
        created = true
    }
    catch {
        data = await SerenaServer.findOne({ server: body.server })
    }
    finally {
        data = data._doc
        data.created = created

        return response(res, 200, data)
    }
}