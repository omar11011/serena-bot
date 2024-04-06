const { axios } = require('../services')

module.exports = async user => {
    let duelData = (await axios.get({ url: `serena/duel/${user}?current=yes` })).data

    if (duelData.length < 1) return false

    return {
        me: duelData.find(e => e.owner === user),
        rival: duelData.find(e => e.owner !== user),
    }
}