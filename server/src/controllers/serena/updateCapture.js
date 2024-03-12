const { SerenaCapture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    if (!body._id) return response(res, 402)

    try {
        let result = await SerenaCapture.findByIdAndUpdate(body._id, {
            $set: body.set || {},
            $inc: body.inc || {},
        }, { new: true })

        return response(res, 200, result)
    }
    catch {
        return response(res, 401)
    }
}