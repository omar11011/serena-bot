const { SerenaServer } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    if (!body.server) return response(res, 402)

    try {
        let result = await SerenaServer.findOneAndUpdate({ server: body.server }, {
            $set: body.set || {},
            $inc: body.inc || {},
        }, { new: true })

        return response(res, 200, result)
    }
    catch {
        return response(res, 401, { error: `Hubo un problema al tratar de actualizar el servidor ${body.server}` })
    }
}