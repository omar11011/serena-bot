const { axios } = require('../services')

module.exports = async user => {
    let { data } = (await axios.get({
        url: `serena/capture?owner=${user}&limit=1&select=yes`,
    })).data

    if (data.length < 1) return false
    
    return data[0]
}