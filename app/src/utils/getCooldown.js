const convertTime = require("./convertTime")
const { memcached } = require('../services')

module.exports = async (cmd, user) => {

    let currentDate = Date.now()
    let result = {
        mustWait: false,
        msg: null,
    }
    let data = await memcached.getData(`cooldown-${cmd.name}-${user}`)

    if (data) {
        let waitTime = (currentDate - data) - (cmd.cooldown * 1000)
        let time = Math.ceil(Math.abs(waitTime) / 1000)
        
        result.mustWait = true
        result.msg = "Para volver a usar este comando debes esperar " + convertTime(time) + "."
    }
    else {
        await memcached.createData({
            key: `cooldown-${cmd.name}-${user}`,
            data: currentDate,
            time: cmd.cooldown,
        })
    }

    return result
    
}