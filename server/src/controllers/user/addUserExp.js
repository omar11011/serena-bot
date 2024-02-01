const { User } = require("../../models")
const { response } = require('../../utils')

module.exports = async (req, res) => {

    const { user, exp } = req.body
    const obj = { up: false }

    try {
        const data = await User.findOneAndUpdate(
            { discord_id: user },
            { $inc: { 'stats.exp': exp } },
            { new: true },
        )

        const newExp = data.stats.exp - (100 * data.stats.level)
        
        if (newExp >= 0) {

            await User.updateOne(
                { discord_id: user },
                {
                    $inc: { 'stats.level': 1 },
                    $set: { 'stats.exp': newExp },
                },
            )

            obj.up = true
            obj.level = data.stats.level + 1
        }

        return response(res, 200, obj)
    }
    catch(err) {
        return response(res, 400, {
            error: `Error al actualizar la experiencia del usuario ${user}: ${err.name}`,
        })
    }

}