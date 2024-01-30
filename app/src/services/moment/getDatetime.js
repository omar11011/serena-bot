const moment = require('moment')
require('moment-timezone')

moment.tz.setDefault('America/Lima')

module.exports = () => {

    const datatime = moment().format('HH:mm A')

    return datatime

}