const { SerenaUser } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    if (!body.user) return response(res, 402)

    try {
        let result = await SerenaUser.findOneAndUpdate({ user: body.user }, {
            $set: body.set || {},
            $inc: body.inc || {},
        }, { new: true })

        return response(res, 200, result)
    }
    catch {
        return response(res, 401)
    }
}