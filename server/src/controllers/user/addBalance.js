const { User } = require("../../models")
const { response } = require('../../utils')

module.exports = async (req, res) => {

    let body = req.body
    let user = body.user

    delete body.user
    
    try {
        const data = await User.updateOne(
            { user },
            { $inc: body },
            { new: true },
        )
        
        return response(res, 200, data)
    }
    catch(err) {
        return response(res, 400, {
            error: `Error al actualizar los recursos del usuario ${user}: ${err.name}`,
        })
    }

}