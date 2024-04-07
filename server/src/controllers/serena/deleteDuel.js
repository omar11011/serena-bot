const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    
    try {
        body.ids.forEach(async e => {
            await SerenaDuelData.deleteOne({ _id: e })
        })

        return response(res, 200, result)
    }
    catch {
        return response(res, 400)
    }
}