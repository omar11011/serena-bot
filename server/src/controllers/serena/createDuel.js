const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    
    try {
        let data = await SerenaDuelData.create(body)

        return response(res, 200, data._doc)
    }
    catch {
        return response(res, 400)
    }
}