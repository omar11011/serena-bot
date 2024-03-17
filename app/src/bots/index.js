const ids = require('./ids.json')

module.exports = async message => {
    let id = message.author.id

    if (!ids.hasOwnProperty(id)) return

    let exec = require('./' + ids[id])

    await exec(message)
}