const { User } = require('../../models')
const response = require('../../utils/response')

module.exports = async (req, res) => {
    let body = req.body
    let created = false
    let data = await User.findOne({ discord_id: body.discord_id })

    if (!data) {
        data = await User.create(body)
        created = true
    }

    return response(res, 200, {
        created: created,
        ...data._doc,
    })
}