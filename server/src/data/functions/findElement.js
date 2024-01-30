const chargeData = require('./chargeData')
const Class = require('../../class')

module.exports = (db, id) => {

    let data = chargeData(db)

    if (isNaN(id)) data = data.find(e => e.name.toLowerCase() === id.toLowerCase())
    else data = data.find(e => e.id === parseInt(id))

    if (data) data = JSON.parse(JSON.stringify(new Class[db](data)))

    return data

}