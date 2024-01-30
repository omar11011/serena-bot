require('colors')

const getDatetime = require('../moment/getDatetime')

module.exports = (msg, color) => {

    msg = getDatetime() + ' | ' + msg

    if (color === 'g') msg = msg.green
    else if (color === 'r') msg = msg.red
    else msg = msg.cyan

    return console.log(msg)

}