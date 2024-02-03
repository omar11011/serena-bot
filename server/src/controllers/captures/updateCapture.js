const { Capture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    try {
        const data = await Capture.updateOne(
            { _id: body._id },
            { $set: body },
        )
        
        return response(res, 200, { success: true })
    }
    catch {
        return response(res, 400, { error: 'No se encontró este ID.' })
    }
}