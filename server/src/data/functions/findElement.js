const chargeData = require('./chargeData')
const Class = require('../../class')

const { checkWord } = require('../../utils')

module.exports = (db, id) => {

    let data = chargeData(db)

    if (id) {
        if (isNaN(id)) data = data.find(e => checkWord(e.name.toLowerCase()) === checkWord(id.toLowerCase()))
        else data = data.find(e => e.id === parseInt(id))

        if (data) data = JSON.parse(JSON.stringify(new Class[db](data)))
    }

    return data

}