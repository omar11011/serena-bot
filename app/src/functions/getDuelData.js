const { axios } = require('../services')

module.exports = async user => {
    let duelData = (await axios.get({ url: `serena/duel/${user}?current=yes` })).data
    
    if (duelData.length < 1) return false

    return {
        user: duelData.find(e => e.battle.user === user),
        rival: duelData.find(e => e.battle.rival === user),
    }
}