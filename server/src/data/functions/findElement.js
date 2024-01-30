const chargeData = require('./chargeData')
const Class = require('../../class')

module.exports = props => {

    let data = chargeData(props.db)

    let element = data.find(e => !isNaN(props.id) ? e.id === parseInt(props.id) : e.name.toLowerCase() === props.id.toLowerCase())

    if (element) element = JSON.parse(JSON.stringify(new Class[props.db](element)))

    return element

}