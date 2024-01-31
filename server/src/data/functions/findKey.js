const chargeData = require('./chargeData')
const Class = require('../../class')

module.exports = (db, attribute, id) => {

    let data = chargeData(db)

    data = data.filter(e => e[attribute].toLowerCase().includes(id.toLowerCase()))

    return data

}