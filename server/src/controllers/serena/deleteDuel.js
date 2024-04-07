const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    
    try {
        let result = await SerenaDuelData.deleteMany({
            $or: [
                { owner: body.user },
                { rival: body.user },
            ],
        })

        return response(res, 200, result)
    }
    catch {
        return response(res, 400)
    }
}