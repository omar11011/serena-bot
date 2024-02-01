const chargeData = require('./chargeData')

module.exports = (db, attribute, id) => {

    let data = chargeData(db)

    data = data.filter(e => e[attribute].includes(id))

    return data

}