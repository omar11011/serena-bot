const { SerenaDuelData } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let data
    let user = req.params.user
    let current = req.query.current
    
    if (current) {
        data = await SerenaDuelData.find({
            $or: [
                { 'battle.user': user },
                { 'battle.rival': user },
            ],
        })
    }

    return response(res, 200, data)
}