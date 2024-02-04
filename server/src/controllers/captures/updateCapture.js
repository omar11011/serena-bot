const { Capture } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body

    try {
        await Capture.updateOne(
            { id: body.id },
            { $set: body },
        )
        
        return response(res, 200, { success: true })
    }
    catch {
        return response(res, 400, { error: 'No se encontró este ID.' })
    }
}