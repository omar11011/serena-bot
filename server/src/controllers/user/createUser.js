const { User } = require('../../models')
const { response } = require('../../utils')

module.exports = async (req, res) => {
    let body = req.body
    let created = false
    let data = await User.findOne({ user: body.user })

    if (!data) {
        body.id = Date.now()
        data = await User.create(body)
        created = true
    }

    return response(res, 200, {
        created: created,
        ...data._doc,
    })
}