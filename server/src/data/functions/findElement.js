const chargeData = require('./chargeData')
const checkWord = require('../../utils/checkWord')
const Class = require('../../class')

module.exports = (db, id) => {

    let data = chargeData(db)

    if (isNaN(id)) data = data.find(e => checkWord(e.name.toLowerCase()) === checkWord(id.toLowerCase()))
    else data = data.find(e => e.id === parseInt(id))

    if (data) data = JSON.parse(JSON.stringify(new Class[db](data)))

    return data

}